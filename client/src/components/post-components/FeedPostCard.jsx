import {
    ArrowBigDown,
    ArrowBigUp,
    Dot,
    MessageSquareQuote,
} from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore.js";
import usePostStore from "../../store/usePostStore";
import MediaCarousel from "../MediaCarousel.jsx";

const FeedPostCard = ({ post }) => {
    const { user } = useAuthStore();
    const { starPost, unStarPost, starredPosts } = usePostStore();

    const [isStarred, setIsStarred] = useState(starredPosts.includes(post._id));

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

    const handleStar = async () => {
        const success = await starPost(post._id);
        if (success) {
            setIsStarred(true);
        }
    };

    const handleUnStar = async () => {
        const success = await unStarPost(post._id);
        if (success) {
            setIsStarred(false);
        }
    };

    return (
        <Link
            to={`/post/${post._id}`}
            className=" bg-black text-white rounded-lg shadow-[2px_2px_10px_black] border border-neutral-700 hover:bg-black/95 hover:border-neutral-500
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

                            isStarred ? handleUnStar() : handleStar();
                        }}
                        className="p-1 text-xl hover:bg-neutral-400/30 duration-100 cursor-pointer rounded-lg"
                    >
                        {isStarred ? (
                            <FaStar
                                className={`${isStarred && " fill-amber-500"}`}
                            />
                        ) : (
                            <FaRegStar />
                        )}
                    </button>
                </div>
            </header>

            {/* Post content */}
            <div className="px-4 py-3 space-y-2 ">
                <h2 className="text-2xl font-semibold leading-tight text-white/90">
                    {post.title}
                </h2>

                {post.media?.length > 0 && (
                    <div className="w-full rounded-lg">
                        <MediaCarousel media={post.media} />
                    </div>
                )}

                <p className="text text-neutral-300 leading-relaxed line-clamp-2 overflow-hidden mt-3 mb-5">
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
