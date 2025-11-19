import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const COOKIE_NAME = {
    AUTH_COOKIE_NAME :"access_token",
    CSRF_COOKIE :"csrf_token"
};

export function setCookie(response, token) {
    try {
        response.cookies.set(COOKIE_NAME.AUTH_COOKIE_NAME, token , { 
            httpOnly: true,
            secure: true,
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
  response.cookies.set(COOKIE_NAME.CSRF_COOKIE, "", cookieOptions);

}
     
export function setCsrfToken(response, token) {
    try {
        response.cookies.set(COOKIE_NAME.CSRF_COOKIE, token , {
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',   
            path: '/',
            maxAge: 60 * 60 //1 hour
        });
    } catch (error){
        console.error("Error setting CSRF token:", error);
    }   
} 

export function getCookie(name) {
    try {
        return cookies.get(name)?.value || null;
    } catch (error) {
        console.error("Error getting cookie:", error);
        return null;
    }
}    