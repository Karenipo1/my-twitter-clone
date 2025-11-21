import { NextResponse } from "next/server"; 
import  bcrypt  from "bcryptjs";
import { setCookie} from "@/lib/cookies";
import User from "@/models/User";   
import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
    try {
        // Parse request body
        const { email, password } = await request.json();
        // Basic validation
        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        await connectDB();
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }
         // Create JWT
        const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        });

        // Prepare response
        const response = NextResponse.json({ 
            message: "Login successful", 
            user: { id: user.id, username: user.username, email: user.email }
        });
        // Set cookies
        setCookie(response, token);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}