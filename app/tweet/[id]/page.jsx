import Link from 'next/link';
import TweetThread from '@/app/components/TweetThread';

async function getTweet(id){
  //const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
  {cache: 'no-store'}
  );

  if (!res.ok) throw new Error("Error fetching tweet");
  return res.json();
}

async function getReplies(parentId) {
  //const res = await fetch("https://dummyjson.com/posts?limit=3");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?parent=${parentId}`,
  {cache: 'no-store'}
  );
  
  if (!res.ok) throw new Error("Error fetching replies");
  return res.json();
}

export default async function TweetDetail({params}) {
    const tweet = await getTweet(params.id);
    const replies = await getReplies(params.id);
  return <TweetThread tweet={tweet} replies={replies} />

}
