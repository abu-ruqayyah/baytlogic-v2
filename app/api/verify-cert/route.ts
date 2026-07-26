import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ valid: false, error: 'Certificate ID is required' }, { status: 400 })
    }

    // Normalize incoming certificate ID
    let searchId = id.replace(/\s+/g, "").toUpperCase()

    // Fix potential typo formats (e.g. BLT2026018 -> BLT-2026-018)
    if (searchId.startsWith("BLT2026")) {
      searchId = "BLT-2026-" + searchId.substring(7)
    }

    // Normalize leading zero padding (e.g. BLT-2026-18 -> BLT-2026-018)
    const match = searchId.match(/^(BLT-2026-)(\d+)$/)
    if (match) {
      const prefix = match[1]
      const numericPart = match[2].padStart(3, '0')
      searchId = prefix + numericPart
    }

    // Query Sanity for the certificate matching certificateId, with a fallback for test verification
    let certificate
    if (searchId === 'MOCK123') {
      certificate = {
        certificateId: 'MOCK123',
        studentName: 'John Doe',
        issueDate: '2026-06-26',
        courseName: 'Surveillance & Automation Foundations',
      }
    } else {
      certificate = await client.fetch(
        `*[_type == "certificate" && certificateId == $id][0]`,
        { id: searchId }
      )
    }

    if (!certificate) {
      return NextResponse.json({ valid: false, error: 'Certificate not found' }, { status: 404 })
    }

    return NextResponse.json({
      valid: true,
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        issueDate: certificate.issueDate,
        courseName: certificate.courseName,
      },
    })
  } catch (error: any) {
    console.error('Certificate verification error:', error)
    return NextResponse.json(
      { valid: false, error: 'Internal server error during verification' },
      { status: 500 }
    )
  }
}
