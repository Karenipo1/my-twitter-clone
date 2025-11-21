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

    const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  };

  response.cookies.set(COOKIE_NAME.AUTH_COOKIE_NAME, "", cookieOptions);

}
     
export function getCookie(name) {
    try {
        return cookies.get(name)?.value || null;
    } catch (error) {
        console.error("Error getting cookie:", error);
        return null;
    }
}    