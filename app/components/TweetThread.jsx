"use client";
import { useState, useEffect } from "react";
import PostComposer from "./PostComposer";
import TweetCard from "./TweetCard";

export default function TweetThread({ tweet, replies: initialReplies }) {
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

  return (
    <section className="flex flex-col border-l border-r border-[rgb(var(--color-border))] min-h-screen">
      
      <TweetCard tweet={tweet} onNewReply={fetchReplies} />

      <PostComposer 
      placeholder={"Post your reply"}
      parentId={tweet._id}
      onPostSuccess={fetchReplies}
      />
      {/* Comments list */}
      <div>
        {replies?.map((reply) => (
          <TweetCard 
          key={reply._id} 
          tweet={reply} 
          onNewReply={fetchReplies}
          />
        ))}
      </div>
    </section>
  );
}
