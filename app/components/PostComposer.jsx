"use client";

import { useState } from "react";
import { Image, Smile, Globe } from "lucide-react";

export default function PostComposer({ onPost }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    // Simula envío de tweet
    const newPost = {
      id: Date.now(),
      body: content,
      user: "you",
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    // Llama callback (si viene del padre)
    onPost?.(newPost);

    // Simula retardo de red
    await new Promise((r) => setTimeout(r, 500));

    setContent("");
    setLoading(false);
  };

  return (
    <div className="border-b border-[rgb(var(--color-border))] p-4 flex gap-3">
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
          placeholder="What's happening?"
          rows={2}
          className="w-full bg-transparent text-[rgb(var(--color-text))] resize-none focus:outline-none placeholder-gray-500"
        />

        {/* Barra inferior */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex gap-3 text-[rgb(var(--color-text-secondary))]">
            <Image size={18} className="cursor-pointer hover:text-sky-500" />
            <Smile size={18} className="cursor-pointer hover:text-sky-500" />
            <Globe size={18} className="cursor-pointer hover:text-sky-500" />
          </div>

          <button
            type="submit"
            disabled={!content.trim() || loading}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              content.trim()
                ? "bg-sky-500 hover:bg-sky-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            } transition`}
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
}
