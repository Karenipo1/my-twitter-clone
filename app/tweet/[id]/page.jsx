import Link from 'next/link';

async function getTweet(id){
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await res.json();

  await new Promise((resolve)=>setTimeout(resolve, 2000));
  return data;
}

export default async function TweetDetail({params}) {
    const tweet = await getTweet(params.id);
    console.log('TweetDetail', {params} );
  return (
    <main>
        <sup>Tweet id: {tweet.id}</sup>
        
                <h2>{tweet.title}</h2>
                <p>{tweet.body}</p>
                <p>{tweet.reactions.likes} {tweet.reactions.dislikes}</p>
                <p>{tweet.tags.join(', ')}</p>
                <Link href="/"
                >Back to Feed
                </Link>
    </main>

  );
}
