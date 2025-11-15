import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "access_token";
const CSRF_COOKIE = "csrf_token";

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
        response.cookies.set({
            user: AUTH_COOKIE_NAME, 
            value: token, 
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
            
export function deleteCookie(response) {
    try {
        response.cookies.set({
            user: AUTH_COOKIE_NAME,
            value: '',
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            path: '/',
            maxAge: 0
        });
    } catch (error) {
        console.error("Error deleting cookie:", error);
    }       
}

export function setCsrfToken(response, token) {
    try {
        response.cookies.set({
            user: CSRF_COOKIE, 
            value: token, 
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

export const COOKIE_NAME = {
    AUTH_COOKIE_NAME,
    CSRF_COOKIE
};    