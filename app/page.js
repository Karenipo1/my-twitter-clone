import React from 'react';
import TweetCard from './components/TweetCard';
import Link from 'next/link';
import Header from './components/Header';

async function getTweets(){
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function Home() {

const tweets = await getTweets();

  return (
    <>
    <Header></Header>
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
          mx-auto
        "
    >
    <div>  this is the home page
        {tweets &&
          tweets.posts &&
            tweets.posts.map((tweet)=>(

              <Link key={tweet.id} href={`/tweet/${tweet.id}`}
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
