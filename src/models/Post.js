import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user_name: { type: String, required: true },
    user: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, default: null },
    emoji: { type: String, default: null },
    likes: { type: Number, default: 0 },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
