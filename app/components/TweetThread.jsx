import TweetCard from "./TweetCard";

export default function TweetThread({ tweet, replies }) {
  return (
    <section className="flex flex-col border-l border-r border-[rgb(var(--color-border))] min-h-screen">
      {/* Principal Tweet */}
      <TweetCard tweet={tweet} />

      {/* Reply box */}
      <div className="flex items-start gap-3 p-4 border-b border-[rgb(var(--color-border))]">
        <img
          src={`https://api.dicebear.com/9.x/identicon/svg?seed=currentUser`}
          alt="current user"
          className="w-10 h-10 rounded-full"
        />
        <textarea
          className="flex-1 bg-transparent border-b border-gray-700 focus:outline-none resize-none text-[rgb(var(--color-text))]"
          placeholder="Post your reply"
          rows={2}
        />
      </div>

      {/* Comments list */}
      <div>
        {replies?.posts?.map((reply) => (
          <TweetCard key={reply.id} tweet={reply} />
        ))}
      </div>
    </section>
  );
}
