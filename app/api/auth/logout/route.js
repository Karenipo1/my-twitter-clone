import {NextResponse} from "next/server";
import {deleteCookie} from "@/lib/cookies";
import {COOKIE_NAME} from "@/lib/cookies";

export async function POST(request) {
    try {
        const response = NextResponse.json({ message: "Logged out successfully" });

        clearAuthCookies(response);
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }   
}