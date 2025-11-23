"use client";

import { useState } from "react";
import { Image, Smile, Globe } from "lucide-react";
import ToolTip from "./ToolTip";

export default function PostComposer({ placeholder, onPostSuccess, parentId, onClose }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    // Simulated tweet
    const newPost = {
      user_name: "Current User",
      user: "you",  
      body: content,
      image: "you",
      emoji: null,
      parent: parentId || null,
      
    };
    try{
      const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if(!res.ok) throw new Error("Failed to post");

    const savedPost = await res.json(); //Post saved
    
    onPostSuccess?.(savedPost);
    onClose?.();  
    setContent("");

    } catch (error){
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b border-[rgb(var(--color-border))] mt-1 p-4 flex gap-3">
      {/* Avatar */}
      <img
        src="https://api.dicebear.com/9.x/identicon/svg?seed=currentUser"
        alt="current user"
        className="w-10 h-10 rounded-full"
      />

      {/* Caja de texto + acciones */}
      <form onSubmit={handleSubmit} className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || "What's happening?"}
          rows={2}
          className="w-full bg-transparent text-[rgb(var(--color-text))] resize-none focus:outline-none placeholder-gray-500"
        />

        {/* Barra inferior */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3 text-[rgb(var(--color-text-secondary))]">
            <ToolTip text="Media"><Image size={18} className="cursor-pointer text-sky-500" /></ToolTip>     
            <ToolTip text="Emoji"><Smile size={18} className="cursor-pointer text-sky-500" /></ToolTip>
            <ToolTip text="Location"><Globe size={18} className="cursor-pointer text-sky-500" /></ToolTip>
          </div>

          <button
            type="submit"
            disabled={!content.trim() || loading}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              content.trim()
                ? "bg-sky-500 hover:bg-sky-600 text-white"
                : "bg-gray-500 text-white cursor-not-allowed"
            } transition`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
