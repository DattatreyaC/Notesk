import {
    ArrowBigDown,
    ArrowBigUp,
    Dot,
    MessageSquareQuote,
} from "lucide-react";

import { FaRegStar } from "react-icons/fa";

import React from "react";
import { Link } from "react-router-dom";

const FeedPostCard = ({ post }) => {
    const calculateDay = () => {
        const date = new Date(post.createdAt);

        const diffMs = Date.now() - date.getTime();

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays > 0)
            return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours > 0)
            return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        if (diffMinutes > 0)
            return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

        return "just now";
    };

    return (
        <Link
            to={`/post/${post._id}`}
            className="border border-neutral-700 bg-neutral-900 text-white rounded-lg shadow-[2px_2px_10px_black] hover:border-neutral-400
                     transition duration-200"
        >
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
                <div className="flex items-center gap-0.5">
                    <h1 className="font-light text-sm text-emerald-400 bg-emerald-600/10 rounded-full px-2">
                        @{post.user.username}
                    </h1>

                    <Dot />

                    <span className="text-xs text-neutral-400">
                        {calculateDay()}
                    </span>
                </div>

                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="p-1 text-xl hover:bg-neutral-400/30 duration-100 cursor-pointer rounded-lg"
                    >
                        <FaRegStar className="" />
                    </button>
                </div>
            </header>

            {/* Post content */}
            <div className="px-4 py-3 space-y-2">
                <h2 className="text-xl font-semibold leading-tight text-white/90">
                    {post.title}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-5 overflow-hidden ">
                    {post.content}
                </p>
            </div>

            {/* Footer */}
            <footer className="flex items-center gap-3 px-4 py-2 border-t border-neutral-800 text-sm text-neutral-300">
                {/* Upvote/Downvote */}
                <div className="flex items-center bg-neutral-800/50 border border-neutral-700 rounded-full overflow-hidden">
                    <button
                        className="flex items-center gap-1 px-2 py-1 hover:bg-emerald-600/70 transition "
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <ArrowBigUp size={18} />
                        <span className="text-sm">{post.upvotes}</span>
                    </button>
                    <button
                        className="flex items-center gap-1 px-2 py-1 hover:bg-rose-600/70 transition"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <ArrowBigDown size={18} />
                    </button>
                </div>

                {/* Comments */}
                <button className="flex items-center gap-1.5 px-3 py-1 border border-neutral-700 rounded-full hover:bg-neutral-800 transition">
                    <MessageSquareQuote size={18} />
                    <span>{post.comments.length}</span>
                </button>
            </footer>
        </Link>
    );
};

export default FeedPostCard;
