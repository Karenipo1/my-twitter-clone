"use client";
import React, {useState, useEffect} from 'react';
import TweetCard from '../components/TweetCard';
import Link from 'next/link';
import Header from '../components/Header';
import PostComposer from '../components/PostComposer';
import { useTweetContext } from '../context/TweetContext';
import useRequireAuth from '../hooks/useRequireAuth';

export default function Home() {
  
  const user = useRequireAuth();

  const [tweets, setTweets] = useState([]);
  const { refreshFlag } = useTweetContext();

  const getTweets = async()=>{
    try {
      console.log("📡 Fetching tweets...");
      //const res = await fetch("https://dummyjson.com/posts");
      const res = await fetch("/api/posts", { cache: "no-store" });
      console.log("🔢 Response status:", res.status);
      const data = await res.json();
      console.log("🧾 Data received:", data);
      setTweets(data||[] );
    } catch (error) {
      console.log("Error fetching tweets:", error);
    }
  };
    
   useEffect(()=>{
    getTweets();
   },[refreshFlag]); 


  return (
    <>
    <Header></Header>
    <PostComposer onPostSuccess={getTweets} />
    <section
      className="
          flex-1
          border-x border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-bg))]
          text-[rgb(var(--color-text))]
          transition-colors
          xs:max-w-[95%]
          sm:max-w-[600px]
          md:max-w-[680px]
          lg:max-w-[700px]
          xl:max-w-[750px]
          2xl:max-w-[800px]
        "
    >
    <div>
        {tweets.map((tweet)=>(

              <Link key={tweet._id} href={`/tweet/${tweet._id}`}
                className="block hover:bg-[rgb(var(--color-border))]/10 transition-colors"
              >
                <TweetCard tweet={tweet}></TweetCard>
              </Link>
              
            ))
        }
    </div>
    </section>
    </>

  );
}
