import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return Response.json(posts);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const newPost = await Post.create(data);
  return Response.json(newPost, { status: 201 });
}
