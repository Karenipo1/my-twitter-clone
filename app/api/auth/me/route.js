import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import {COOKIE_NAME} from "@/lib/cookies";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
    try {
        const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ user: null }, { status: 401 });
        }
        
        return NextResponse.json({ user: payload });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }       
}
