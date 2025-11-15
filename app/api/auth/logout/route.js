import {NextResponse} from "next/server";
import {deleteCookie} from "@/lib/cookies";
import {COOKIE_NAME} from "@/lib/cookies";

export async function POST(request) {
    try {
        const response = NextResponse.json({ message: "Logged out successfully" });

        deleteCookie(response, COOKIE_NAME.CSRF_COOKIE);
        deleteCookie(response, COOKIE_NAME.AUTH_COOKIE_NAME);
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }   
}