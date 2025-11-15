import crypto from 'crypto';
import { getCookie, COOKIE_NAME  } from 'cookies.js';

export function generateCsrfToken() {
    return crypto.randomBytes(32).toString('hex');
}

export function validateCsrfToken(request) {
    try {
        const cookieToken = getCookie(COOKIE_NAME.CSRF_COOKIE);
        const headerToken = request.headers.get('X-CSRF-Token');    
        if (!cookieToken || !headerToken || cookieToken !== headerToken) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error validating CSRF token:", error);
        return false;
    }   
}
