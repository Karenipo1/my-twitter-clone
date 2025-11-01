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
    <div className='flex-1'>  this is the home page
        {tweets &&
          tweets.posts &&
            tweets.posts.map((tweet)=>(

              <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
                <TweetCard tweet={tweet}></TweetCard>
              </Link>
              
            ))
        }
    </div>
    </>

  );
}
