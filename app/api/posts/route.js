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
  const newPost = await Post.create({
    user_name: data.user_name,
    user: data.user,
    body: data.body,
    image: data.image || null,
    emoji: data.emoji || null,
    parent: data.parent || null, // si es reply
  });
  return Response.json(newPost, { status: 201 });
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { action } = await req.json(); // "like" o "unlike"

  const updatedPost =
    action === "like"
      ? await Post.findByIdAndUpdate(
          params.id,
          { $inc: { likes: 1 } }, // 🔼 suma 1 like
          { new: true }
        )
      : await Post.findByIdAndUpdate(
          params.id,
          { $inc: { likes: -1 } }, // 🔽 resta 1 like
          { new: true }
        );

  return Response.json(updatedPost);
}