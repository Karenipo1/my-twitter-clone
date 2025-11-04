import PostComposer from "./PostComposer";
import TweetCard from "./TweetCard";

export default function TweetThread({ tweet, replies }) {

  return (
    <section className="flex flex-col border-l border-r border-[rgb(var(--color-border))] min-h-screen">
      
      <TweetCard tweet={tweet} />

      <PostComposer placeholder={"Post your reply"}/>
      {/* Comments list */}
      <div>
        {replies?.posts?.map((reply) => (
          <TweetCard key={reply.id} tweet={reply} />
        ))}
      </div>
    </section>
  );
}
