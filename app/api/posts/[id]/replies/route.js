import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  await connectDB();

  const replies = await Post.find({ parent: params.id }).sort({ createdAt: -1 });
  return Response.json(replies);
}
