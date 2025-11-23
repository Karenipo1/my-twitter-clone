import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";


export async function GET(request) {

    await connectDB();
    const url = new URL(request.url);
    const parent = url.searchParams.get("parent");

    // count replies
     if (parent) {
      const replies = await Post.find({ parent })
        .sort({ createdAt: -1 });
      return Response.json(replies);
    }

    // fetch main posts with replies count
    const posts = await Post.aggregate([
      { $match: { parent: null } },
      {
        $lookup: {
          from: "posts",            
          localField: "_id",        
          foreignField: "parent",  
          as: "replies"             
        }
      },
      {
        $addFields: {
          repliesCount: { $size: "$replies" }
        }
      },
      {
        $project: {
          replies: 0                // excluded replies array
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

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
      parent: data.parent || null, // si este id se informa es reply a otro post
    });
    return Response.json(newPost, { status: 201 });
}
