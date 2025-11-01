import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn, Share } from "lucide-react";

export default function TweetCard({tweet}) {

    return(
        <div
            >
                <h2 className="text-amber-500">{tweet.title}</h2>
                <p>{tweet.body}</p>
                <p className="text-3xl">{tweet.reactions.likes} {tweet.reactions.dislikes}</p>
                <p className="text-2xl">{tweet.tags.join(', ')}</p>
        </div>
    );
}