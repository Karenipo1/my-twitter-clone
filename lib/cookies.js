import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const COOKIE_NAME = {
    AUTH_COOKIE_NAME :"access_token",
    CSRF_COOKIE :"csrf_token"
};


export function getCookie(name) {
    try {
        return cookies.get(name)?.value || null;
    } catch (error) {
        console.error("Error getting cookie:", error);
        return null;
    }
}

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
            
export function deleteCookie(response, cookieName) {
  try {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0)
    });
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
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

    