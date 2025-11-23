import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const COOKIE_NAME = {
    AUTH_COOKIE_NAME :"access_token",
};

const isProd = process.env.NODE_ENV === "production";

export function setCookie(response, token) {
    try {
        response.cookies.set(COOKIE_NAME.AUTH_COOKIE_NAME, token , { 
            httpOnly: true,
            secure: isProd,
            sameSite: 'Lax',
            path: '/',
            maxAge: 60 * 60 //1 hour
        });
    } catch (error){
        console.error("Error setting cookie:", error);
    }
}

export function clearAuthCookie(response) {

    console.log("➡️ clearAuthCookie called");
    const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: "Lax",
    path: "/",
    expires: new Date(0),
  };
  console.log("🧩 Clearing cookie with options:", cookieOptions);
  response.cookies.set(COOKIE_NAME.AUTH_COOKIE_NAME, "", cookieOptions);
  console.log("📤 Cookie after setting expiration:", response.cookies.getAll());

}
     
export function getCookie(name) {
    try {
        return cookies.get(name)?.value || null;
    } catch (error) {
        console.error("Error getting cookie:", error);
        return null;
    }
}    