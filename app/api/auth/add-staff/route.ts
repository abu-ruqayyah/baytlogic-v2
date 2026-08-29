import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
})

export async function POST(request: Request) {
  try {
    const { name, username, password } = await request.json().catch(() => ({}))

    if (!name || !username || !password) {
      return NextResponse.json(
        { error: 'Staff Full Name, Username, and Password are required.' },
        { status: 400 }
      )
    }

    const cleanUser = username.trim().toLowerCase()

    // Check if username already exists
    const existing = await writeClient.fetch(
      `*[_type == "staff" && lower(username) == $u][0]`,
      { u: cleanUser }
    )

    if (existing) {
      return NextResponse.json(
        { error: `A staff member with username "${cleanUser}" already exists.` },
        { status: 409 }
      )
    }

    // Create staff document in Sanity
    const newStaff = await writeClient.create({
      _type: 'staff',
      name: name.trim(),
      username: cleanUser,
      password: password
    })

    return NextResponse.json({
      success: true,
      message: `Staff member "${name}" registered successfully!`,
      staff: {
        id: newStaff._id,
        name: newStaff.name,
        username: newStaff.username
      }
    })
  } catch (err: any) {
    console.error('Add staff error:', err)
    return NextResponse.json(
      { error: 'Failed to create staff member. Please check Sanity credentials.' },
      { status: 500 }
    )
  }
}
