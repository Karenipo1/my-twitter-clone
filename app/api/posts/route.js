import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const parent = url.searchParams.get("parent");

    const query = parent ? { parent } : {};

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Error fetching posts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const newPost = await Post.create({
      user_name: data.user_name,
      user: data.user,
      body: data.body,
      image: data.image || null,
      emoji: data.emoji || null,
      parent: data.parent || null, // si este id se informa es reply a otro post
    });
    return Response.json(newPost, { status: 201 });
    
  }catch (error) {
    return Response.json({ error: "Error creating post" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { action } = await request.json(); // "like" o "unlike"

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
  } catch (error) {
    return Response.json({ error: "Error updating post" }, { status: 500 });
  }
}