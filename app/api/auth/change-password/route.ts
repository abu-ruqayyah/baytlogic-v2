import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN // has editor write permissions
})

export async function POST(request: Request) {
  try {
    const { username, currentPassword, newPassword } = await request.json().catch(() => ({}))

    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Username, current password, and new password are required.' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      )
    }

    const cleanUser = username.trim().toLowerCase()

    // 1. Search for the staff document in Sanity
    const staffDoc = await writeClient.fetch(
      `*[_type == "staff" && (lower(username) == $u || lower(email) == $u)][0]`,
      { u: cleanUser }
    )

    if (staffDoc) {
      if (staffDoc.password !== currentPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect.' },
          { status: 401 }
        )
      }

      // Update password in Sanity
      await writeClient.patch(staffDoc._id).set({ password: newPassword }).commit()

      return NextResponse.json({
        success: true,
        message: `Password for ${staffDoc.name || cleanUser} updated successfully!`
      })
    }

    // 2. Fallback for master admin if not in Sanity yet (create the staff record with the new password)
    const envUser = process.env.ADMIN_USERNAME ? process.env.ADMIN_USERNAME.trim().toLowerCase() : ''
    const envPass = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : ''

    const isMasterUser = cleanUser === 'aburuqayyah001@gmail.com' || cleanUser === 'admin' || (envUser && cleanUser === envUser)
    const isMasterPass = currentPassword.trim() === 'Baytlogic@2025' || currentPassword.trim() === 'baytlogic2026' || (envPass && currentPassword.trim() === envPass)

    if (isMasterUser && isMasterPass) {
      // Create permanent Sanity staff record for master admin
      await writeClient.create({
        _type: 'staff',
        name: 'Yahaya Sulaiman Abdullahi',
        username: cleanUser,
        password: newPassword
      })

      return NextResponse.json({
        success: true,
        message: 'Master Admin password updated and stored successfully!'
      })
    }

    return NextResponse.json(
      { error: 'User not found or current password incorrect.' },
      { status: 404 }
    )
  } catch (err: any) {
    console.error('Password update error:', err)
    return NextResponse.json(
      { error: 'Could not update password. Please try again or update via Studio.' },
      { status: 500 }
    )
  }
}
