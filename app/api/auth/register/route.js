import { NextResponse } from "next/server";
import  bcrypt  from "bcryptjs";
import User from "../../../../models/User";
import {connectDB} from "@/lib/mongodb"

export async function POST(request) {

    try {
        // Parse request body
        const { username, email, password } = await request.json();
        
        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        // Check if user already exists
        await connectDB();
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }
        
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });
 
        // Prepare response
        return new Response(JSON.stringify({ 
            message: true, 
            user: { id: newUser._id, name: newUser.username,email: newUser.email  } 
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}