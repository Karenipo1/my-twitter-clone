import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { COOKIE_NAME } from "@/lib/cookies";
import { validateCsrfToken } from "@/lib/csrf";

const PUBLIC_PATHS = [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/refresh',
    '/api/auth/register'
];

const PROTECTED_PATHS = [
    '/', 
    '/explore',
    '/messages',
    '/notifications',
    '/profile', 
    '/tweet',
    '/api/posts',
    '/api/user'
];
const CSRF_PROTECTED_METHODS = ['POST', 'PUT', 'PATCH','DELETE'];

export async function middleware(request) {
    const {pathname} = request.nextUrl;

    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    const isProtectedPath = PROTECTED_PATHS.includes(pathname);
    
    if (!isProtectedPath) { 
        return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    if (CSRF_PROTECTED_METHODS.includes(request.method)) {
        const isValidCsrf = validateCsrfToken(request); 
        if (!isValidCsrf) {
            return new NextResponse('Invalid CSRF Token', { status: 403 });
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",      
    "/",                
    "/messages/:path*", 
    "/profile/:path*",  
    "/explore/:path*", 
    "/notifications/:path*", 
    "/tweet/:path*",   
  ],
};