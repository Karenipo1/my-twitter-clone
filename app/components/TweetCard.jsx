'use client';
import { useState } from "react";
import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn, Share } from "lucide-react";
import ToolTip from "./ToolTip";

export default function TweetCard({tweet}) {
    //const [likes, setLikes] = useState(tweet.reactions.likes);
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(false);

    const [comments, setComments] = useState(Math.floor(Math.random() * 15));
    const [retweets, setRetweets] = useState(Math.floor(Math.random() * 100));

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    }

    async function handleLike() {
        const action = liked ? "unlike" : "like";
        setLiked(!liked);

        await fetch(`/api/posts/${tweet._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
        });
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
                        <span className="text-xs">{comments}</span>
                    </button>
                    </ToolTip>
                    <ToolTip text="Repost">
                    <button className="  group flex items-center gap-2 hover:text-green-500 transition-colors">
                        <Repeat2 size={16} />
                        <span className="text-xs">{retweets}</span>
                    </button>
                    </ToolTip>
                    <ToolTip text="Like">
                    <button
                        onClick={toggleLike}
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