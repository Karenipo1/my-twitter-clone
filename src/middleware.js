
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
    '/login',
    '/register',
    '/api/auth/register'
];
const PROTECTED_PATH = '/protected';

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;
    
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
    const isProtectedPath = pathname.startsWith(PROTECTED_PATH);
    if (isProtectedPath && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }
    if (isPublicPath && token) {
        const protectedUrl = new URL('/protected', request.url);
        return NextResponse.redirect(protectedUrl);
    }
    return NextResponse.next();
}
export const config = {
  matcher: [
    "/login/:path*", 
    "/register/:path*", 
    "/api/:path*",
    "/protected/:path*",  
    ],
};