import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request, {params}) {
  try {
    await connectDB();
    const posts = await Post.findById(params.id); // to get a single post by its ID

    if (!posts) { 
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Error fetching posts" }, { status: 500 });
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
