import { NextResponse } from 'next/server'
 
// logic to controll these path 
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicpath = path === '/login' || path === '/signup'
    const token = request.cookies.get("Token")?.value || ""

    if (isPublicpath && token) {
        return NextResponse.redirect(new URL('/profile',request.nextUrl))
    }
    if (!isPublicpath && !token) {
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
}
 
// What are the path we are going to controll
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:path*'
  ]
}