"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostComposer from "./PostComposer";
import TweetCard from "./TweetCard";

export default function TweetThread({ tweet:initialTweet, replies: initialReplies }) {
  const [tweet, setTweet] = useState(initialTweet);
  const [replies, setReplies ] = useState(initialReplies || []);

  const fetchReplies  = async () => {
    try {
      const res = await fetch(`/api/posts?parent=${tweet._id}`, {cache: 'no-store'});
      if (!res.ok) throw new Error("Error fetching replies");
      const data = await res.json();
      setReplies(data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    } 
  };

  useEffect(() => {
    setReplies(initialReplies);
  }, [initialReplies]);

  const handleNewReply = (newReply) => {
    setReplies((prev) => [newReply, ...prev]); //added to the top

    setTweet((prev) => ({ // update replies count
      ...prev,
      repliesCount: (prev.repliesCount || 0) + 1,
    }));
  };

  return (
    <section className="flex flex-col border-l border-r border-[rgb(var(--color-border))] min-h-screen">
      
      <TweetCard tweet={tweet} onNewReply={fetchReplies} />

      <PostComposer 
      placeholder={"Post your reply"}
      parentId={tweet._id}
      onPostSuccess={handleNewReply}
      />
      {/* Comments list */}
      <div>
        {replies?.map((reply) => (
          <Link
          key={reply._id}
          href={`/protected/tweet/${reply._id}`}
          className="block hover:bg-[rgb(var(--color-hover))] transition-colors"
          >
          <TweetCard 
          tweet={reply} 
          onNewReply={fetchReplies}
          />
          </Link>
        ))}
      </div>
    </section>
  );
}
