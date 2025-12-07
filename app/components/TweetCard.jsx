'use client';
import { useState, useEffect } from "react";
import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn, Share } from "lucide-react";
import ToolTip from "./ToolTip";

export default function TweetCard({tweet, onNewReply}) {
    //const [likes, setLikes] = useState(tweet.reactions.likes);
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(false);

    async function handleLike() {
        try {
            const action = liked ? "unlike" : "like";
            const res = await fetch(`/api/posts/${tweet._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
            });
            if (!res.ok) throw new Error("Failed to update like");
            const updatedPost = await res.json();
            setLikes(updatedPost.likes);
            setLiked(!liked);
        } catch (error) {
            console.error("Error updating like:", error);
            return;
        }
        onNewReply?.();
    }

    return(
        <article
        className="
        flex flex-col w-full justify-between gap-2 p-4 border-b 
        border-[rgb(var(--color-border))] 
        hover:bg-[rgb(var(--color-bg-hover))] 
        transition-colors cursor-pointer
        "
        >
        <div className="flex flex-row items-start gap-2  w-full">
                <img
                    src={`https://api.dicebear.com/9.x/identicon/svg?seed=${tweet.userId}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full bg-gray-700"
                />
            <div className="flex flex-col w-full">
               <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                    <p className="font-semibold text-[rgb(var(--color-text))]">
                        {tweet.user_name}
                    </p>
                    <p className="text-gray-500 text-sm">{tweet.user}</p>
                    </div>
        
                    <p className="text-[15px] leading-snug text-[rgb(var(--color-text))]">
                    {tweet.body}
                    </p>
                    {tweet.image && (
                    <img
                        src={tweet.image}
                        alt="attached media"
                        className="mt-2 w-full max-h-80 rounded-xl object-cover"
                    />
                    )}
                </div>
                <div className="flex flex-row justify-between mt-3 w-full text-gray-500">

                    <ToolTip text="Replay">
                    <button className=" group flex items-center gap-2 hover:text-sky-500 transition-colors">
                        <MessageCircle size={16} />
                        <span className="text-xs">{tweet.repliesCount || 0}</span>
                    </button>
                    </ToolTip>

                    <ToolTip text="Repost">
                    <button className="  group flex items-center gap-2 hover:text-green-500 transition-colors">
                        <Repeat2 size={16} />
                        <span className="text-xs">0</span>
                    </button>
                    </ToolTip>

                    <ToolTip text="Like">
                    <button
                        onClick={handleLike}
                        className={` group flex items-center gap-2 transition-colors ${
                            liked ? "text-pink-500" : "hover:text-pink-500"
                        }`}
                    >
                        <Heart size={16} />
                        <span className="text-xs">{likes}</span>
                    </button>
                    </ToolTip>

                    <ToolTip text="Share">
                    <button className="  hover:text-sky-500 transition-colors">
                        <Share size={16} />
                    </button>
                    </ToolTip>
                </div>
            </div>
        </div>
        </article>
    );
}