import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/jwt";
import { COOKIE_NAME } from "@/lib/cookies";


export async function GET(request) {

  const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
      if (!token) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const payload = verifyToken(token);
          if (!payload) {
              return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

  try {
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

  } catch (error) {

    return Response.json({ error: "Error fetching posts" }, { status: 500 });

  }
}

export async function POST(request) {

    const token = request.cookies.get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

  
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
