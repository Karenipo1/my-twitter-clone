import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { getServerSession } from 'next-auth/next';
import {authOptions} from "@/lib/authOptions";

export async function POST(request) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { currentPassword, newPassword } = await request.json();
    // User document mongoose
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    // compare current passw vs saved in DB
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
    // encryted newpassw 
    const hashed = await bcrypt.hash(newPassword, 8);
    user.password = hashed;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }   
}