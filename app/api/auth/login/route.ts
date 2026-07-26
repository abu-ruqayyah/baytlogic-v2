import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Create a secure server-side client with write/read privileges
const secureClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
})

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    let staffName = 'Yahaya Sulaiman Abdullahi'
    let authenticated = false

    // 1. Attempt to validate staff against Sanity Studio records
    try {
      const staffDoc = await secureClient.fetch(
        `*[_type == "staff" && username == $username][0] {
          name,
          username,
          password
        }`,
        { username: username.trim().toLowerCase() }
      )

      if (staffDoc && staffDoc.password === password) {
        staffName = staffDoc.name
        authenticated = true
      }
    } catch (err) {
      console.warn('Sanity staff check failed, using local configuration fallback:', err)
    }

    // 2. Fallback to default env credentials if not validated by Sanity
    if (!authenticated) {
      const correctUsername = process.env.STAFF_USERNAME || 'admin'
      const correctPassword = process.env.STAFF_PASSWORD || 'baytlogic2026'

      if (username.trim() === correctUsername && password === correctPassword) {
        staffName = 'Yahaya Sulaiman Abdullahi' // Default fallback admin name
        authenticated = true
      }
    }

    if (authenticated) {
      const response = NextResponse.json({ success: true })
      
      // Cookie 1: Secure, HTTP-only cookie for route protection
      response.cookies.set('baytlogic_staff_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 12, // 12 hours
        path: '/'
      })

      // Cookie 2: Accessible by client-side JS to display staff name on the generated invoice
      response.cookies.set('baytlogic_staff_name', staffName, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 12,
        path: '/'
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
