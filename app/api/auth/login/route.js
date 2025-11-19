import { NextResponse } from "next/server"; 
import { bcrypt } from "bcryptjs";
import { setCookie, setCsrfToken } from "@/lib/cookies";
import { generateToken } from "@/lib/jwt";
import { generateCsrfToken } from "@/lib/csrf";
import User from "@/models/User";   

export async function POST(request) {
    try {
        // Parse request body
        const { email, password } = await request.json();
        // Basic validation
        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }
        // Generate tokens
        const token = generateToken({ id: user.id, username: user.username, email: user.email });
        const csrfToken = generateCsrfToken();
        // Prepare response
        const response = NextResponse.json({ 
            message: "Login successful", 
            user: { id: user.id, username: user.username, email: user.email }, 
            token 
        });
        // Set cookies
        setCookie(response, token);
        setCsrfToken(response, csrfToken);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}