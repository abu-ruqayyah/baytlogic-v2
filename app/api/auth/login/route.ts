import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const secureClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
})

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json().catch(() => ({}))
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const cleanUser = username.trim().toLowerCase()
    const cleanPass = password.trim()
    let staffName = 'Yahaya Sulaiman Abdullahi'
    let staffRole = 'Chief Admin'
    let authenticated = false

    // 1. Check Master Chief Admin credentials (case-insensitive for master pass)
    if (
      (cleanUser === 'aburuqayyah001@gmail.com' || cleanUser === 'admin' || cleanUser === 'yahaya') &&
      (cleanPass.toLowerCase() === 'baytlogic2026' || cleanPass.toLowerCase() === 'admin')
    ) {
      staffName = 'Yahaya Sulaiman Abdullahi'
      staffRole = 'Chief Admin'
      authenticated = true
    }

    // 2. Check Sanity Studio staff records
    if (!authenticated) {
      try {
        const staffDoc = await secureClient.fetch(
          `*[_type == "staff" && (lower(username) == $u || lower(email) == $u)][0] {
            name,
            username,
            role,
            password
          }`,
          { u: cleanUser }
        )

        if (staffDoc && staffDoc.password === password) {
          staffName = staffDoc.name
          staffRole = staffDoc.role || 'Field Engineer'
          authenticated = true
        }
      } catch (err) {
        console.warn('Sanity staff check error:', err)
      }
    }

    if (authenticated) {
      const response = NextResponse.json({
        success: true,
        user: { name: staffName, role: staffRole, username: cleanUser }
      })

      // Cookie 1: Server-side HTTP-Only session token for Next.js Middleware RBAC
      response.cookies.set('baytlogic_staff_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      })

      // Cookie 2: User role for role-based gating
      response.cookies.set('baytlogic_user_role', staffRole, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/'
      })

      // Cookie 3: Staff Name
      response.cookies.set('baytlogic_staff_name', staffName, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/'
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  } catch (err: any) {
    return NextResponse.json({ error: 'Authentication service error.' }, { status: 500 })
  }
}
