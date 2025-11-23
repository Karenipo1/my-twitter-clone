import {NextResponse} from "next/server";
import {clearAuthCookie} from "@/lib/cookies";
import {COOKIE_NAME} from "@/lib/cookies";

export async function POST(request) {
    console.log("➡️ Logout endpoint called");
    
        const response = NextResponse.redirect("/login");
        console.log("🧹 Attempting cookie clear...");
        clearAuthCookie(response);
        console.log("✅ Cookie cleared in response:", response.cookies.getAll());
    
        return response;
    
}