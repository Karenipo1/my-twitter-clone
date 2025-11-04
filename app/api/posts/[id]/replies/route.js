import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  await dbConnect();

  const replies = await Post.find({ parent: params.id }).sort({ createdAt: -1 });
  return Response.json(replies);
}
