import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected route paths requiring authentication
const PROTECTED_PREFIXES = ['/admin', '/certificate', '/boq', '/dashboard/invoices']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if requested path matches any protected routes
  const isProtected = PROTECTED_PREFIXES.some(prefix => 
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (isProtected) {
    const sessionCookie = request.cookies.get('baytlogic_staff_session')
    
    // If not authenticated, redirect to staff login page with return URL
    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      const loginUrl = new URL('/dashboard/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/certificate/:path*',
    '/boq/:path*',
    '/dashboard/invoices/:path*',
  ],
}
