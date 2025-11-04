import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  await dbConnect();

  const post = await Post.findById(params.id);
  if (!post)
    return Response.json({ message: "Tweet no encontrado" }, { status: 404 });

  return Response.json(post);
}
