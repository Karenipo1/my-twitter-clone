'use client';
import { useState, useEffect } from "react";
import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn, Share } from "lucide-react";
import ToolTip from "./ToolTip";

export default function TweetCard({tweet, onNewReply}) {
    //const [likes, setLikes] = useState(tweet.reactions.likes);
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(false);

    const [commentsCount, setCommentsCount] = useState(0);

    //const [comments, setComments] = useState(Math.floor(Math.random() * 15));
    //const [retweets, setRetweets] = useState(Math.floor(Math.random() * 100));

    useEffect(() => {
    async function fetchRepliesCount() {
        if (tweet.parent) return;
        try {
        const res = await fetch(`/api/posts?parent=${tweet._id}`);
        const data = await res.json();
        setCommentsCount(data.length); //cantidad de replies
        } catch (error) {
        console.error("Error fetching replies:", error);
        }
    }
      fetchRepliesCount();
    }, [tweet._id]);

      useEffect(() => {
        if (onNewReply) {
        onNewReply.current = () => {
            setCommentsCount((prev) => prev + 1);
        };
        }
    }, [onNewReply]);

    async function handleLike() {
        try {
            const action = liked ? "unlike" : "like";
            const res = await fetch(`/api/posts/${tweet._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
            });

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
                        User {tweet.user_name}
                    </p>
                    <p className="text-gray-500 text-sm">@user{tweet.user}</p>
                    </div>
        
                    <p className="text-[15px] leading-snug text-[rgb(var(--color-text))]">
                    {tweet.body}
                    </p>
                </div>
                <div className="flex flex-row justify-between mt-3 w-full text-gray-500">

                    <ToolTip text="Replay">
                    <button className=" group flex items-center gap-2 hover:text-sky-500 transition-colors">
                        <MessageCircle size={16} />
                        <span className="text-xs">{commentsCount}</span>
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