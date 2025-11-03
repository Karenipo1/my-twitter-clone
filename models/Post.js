import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
