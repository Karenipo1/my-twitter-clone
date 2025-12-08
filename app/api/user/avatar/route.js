import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";
import {connectDB} from "@/lib/mongodb";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export async function PATCH(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { avatar } = await req.json();

  const updated = await User.findByIdAndUpdate(
    session.user.id,
    { avatar },
    { new: true }
  );

  return NextResponse.json(updated);
}