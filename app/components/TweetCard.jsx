'use client';
import { useState } from "react";
import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn, Share } from "lucide-react";

export default function TweetCard({tweet}) {
    const [likes, setLikes] = useState(tweet.reactions.likes);
    const [liked, setLiked] = useState(false);

    const [comments, setComments] = useState(Math.floor(Math.random() * 15));
    const [retweets, setRetweets] = useState(Math.floor(Math.random() * 100));

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    }

    return(
        <article
        className="
        flex flex-col gap-2 p-4 border-b 
        border-[rgb(var(--color-border))] 
        hover:bg-[rgb(var(--color-bg-hover))] 
        transition-colors cursor-pointer
        "
        >
        <div className="flex items-center gap-2">
                <img
                    src={`https://api.dicebear.com/9.x/identicon/svg?seed=${tweet.userId}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full bg-gray-700"
                />
               <div>
                    <p className="font-semibold text-[rgb(var(--color-text))]">
                        User {tweet.userId}
                    </p>
                    <p className="text-gray-500 text-sm">@user{tweet.userId}</p>
                </div>
        
                <p className="text-[15px] leading-snug text-[rgb(var(--color-text))]">
                    {tweet.body}
                </p>
                <p className="text-sm text-sky-500">{tweet.tags.join(" · ")}</p>

                <div 
                    className="flex justify-between mt-3 max-w-md text-gray-500"
                >
                    <button className="group flex items-center gap-2 hover:text-sky-500 transition-colors">
                        <MessageCircle size={16} />
                        <span className="text-xs">{comments}</span>
                    </button>

                    <button className="group flex items-center gap-2 hover:text-green-500 transition-colors">
                        <Repeat2 size={16} />
                        <span className="text-xs">{retweets}</span>
                    </button>

                    <button
                        onClick={toggleLike}
                        className={`group flex items-center gap-2 transition-colors ${
                            liked ? "text-pink-500" : "hover:text-pink-500"
                        }`}
                    >
                        <Heart size={16} />
                        <span className="text-xs">{likes}</span>
                    </button>

                    <button className="hover:text-sky-500 transition-colors">
                        <Share size={16} />
                    </button>
                </div>
        </div>
        </article>
    );
}