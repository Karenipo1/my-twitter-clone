import Link from 'next/link';
import TweetThread from '@/app/components/TweetThread';

async function getTweet(id){
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await res.json();

  //await new Promise((resolve)=>setTimeout(resolve, 200));
  return data;
}

async function getReplies() {
  const res = await fetch("https://dummyjson.com/posts?limit=3");
  return res.json();
}

export default async function TweetDetail({params}) {
    const tweet = await getTweet(params.id);
    const replies = await getReplies();
  return <TweetThread tweet={tweet} replies={replies} />

}
