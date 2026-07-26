import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { type } = await request.json().catch(() => ({}))
    console.log(`[Analytics] Digital Business Card Click Tracked: ${type}`)
    
    // Resolves successfully to preserve front-end stability
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking card click:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
