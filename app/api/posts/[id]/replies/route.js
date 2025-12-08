import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req, context) {
  await connectDB();
  const { id } = await context.params;
  const replies = await Post.find({ parent: id }).sort({ createdAt: -1 });
  return Response.json(replies);
}
