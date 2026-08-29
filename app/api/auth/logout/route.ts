import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  
  response.cookies.set('baytlogic_staff_session', '', { maxAge: 0, path: '/' })
  response.cookies.set('baytlogic_user_role', '', { maxAge: 0, path: '/' })
  response.cookies.set('baytlogic_staff_name', '', { maxAge: 0, path: '/' })

  return response
}
