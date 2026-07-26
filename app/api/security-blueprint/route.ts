import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    // Call the legacy Netlify serverless function
    const response = await fetch('https://www.baytlogic.com.ng/.netlify/functions/security-blueprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Legacy AI Service Error Response:', errorText)
      return NextResponse.json({ error: 'Failed to generate security plan from legacy AI service.' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('AI Security Blueprint proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error while connecting to legacy AI service.' },
      { status: 500 }
    )
  }
}
