import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/user";
import {COOKIE_NAME} from "@/lib/cookies";

export async function GET(request) {
    try {
        const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }       
}
