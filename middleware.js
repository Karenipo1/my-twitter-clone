import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/cookies";
import { verifyToken } from "@/lib/jwt";

const PUBLIC_PATHS = [
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/register'
];
const PROTECTED_PATH = '/protected';

export async function middleware(request) {
    const {pathname} = request.nextUrl;

    const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;

    console.log("---- MIDDLEWARE ----");
    console.log("PATH:", pathname);
    console.log("TOKEN:", token ? "✔️ EXISTE" : "❌ NO EXISTE");

    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        console.log("➡️ Ruta pública");
        if (token) {
        console.log(`🔁 Usuario logueado → redirigiendo a ${PROTECTED_PATH}`);
        return NextResponse.redirect(new URL(PROTECTED_PATH, request.url));
        }
        return NextResponse.next();
    }

    if (pathname.startsWith(PROTECTED_PATH)) {
        console.log("🔒 Ruta protegida");
        if (!token) {
        console.log("❌ No hay cookie → redirigiendo a /login");
        return NextResponse.redirect(new URL("/login", request.url));
        }
        console.log("✔️ Cookie presente → acceso permitido");
        return NextResponse.next();
    }
    
}
export const config = {
  matcher: [
    "/login/:path*", 
    "/register/:path*", 
    "/api/:path*",
    "/protected/:path*",  
    ],
};