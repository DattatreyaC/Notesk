import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePostStore from "../store/usePostStore";
import { ArrowBigUp, ArrowBigDown, MessageSquareQuote } from "lucide-react";
import { FaRegStar } from "react-icons/fa";

const PostViewPage = () => {
    const { id } = useParams();
    const { fetchPostById, isPostsLoading, post } = usePostStore();

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

    useEffect(() => {
        fetchPostById(id);
    }, [fetchPostById, id]);

    if (isPostsLoading) {
        return (
            <section className="bg w-full h-screen flex items-center justify-center pl-12 py-5 pr-1 overflow-y-auto relative overflow-x-hidden z-30">
                <p className="text-neutral-400 text-lg font-medium animate-pulse">
                    Loading post...
                </p>
            </section>
        );
    }

    if (!post) {
        return (
            <section className="bg w-full h-screen flex items-center justify-center pl-12 py-5 pr-1 overflow-y-auto relative overflow-x-hidden z-30">
                <p className="text-neutral-400 text-lg font-medium">
                    Post not found ❌
                </p>
            </section>
        );
    }

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 py-5 pr-1 overflow-y-auto relative overflow-x-hidden z-30">
            <main className="flex flex-col items-center w-full">
                <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-neutral-950/95 text-white rounded-xl shadow-sm p-6 space-y-8">
                    {/* --- Post Header & Content --- */}
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/user-profile/${post.user.username}`}
                                className="text-sm text-emerald-400 font-medium hover:underline"
                            >
                                @{post.user?.username}
                            </Link>
                            <span className="text-xs text-neutral-500">
                                {calculateDay()}
                            </span>
                        </div>

                        <div>
                            <button className="p-1 text-xl hover:bg-neutral-400/30 duration-100 cursor-pointer rounded-lg">
                                <FaRegStar className="" />
                            </button>
                        </div>
                    </header>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-extrabold leading-tight text-white tracking-tight">
                            {post.title}
                        </h1>
                        <p className="text-base text-neutral-300 leading-relaxed">
                            {post.content}
                        </p>
                    </div>

                    {/* --- Interaction Row --- */}
                    <div className="flex items-center gap-4 text-sm text-neutral-300 pt-3 border-t border-neutral-800">
                        <div className="flex items-center bg-neutral-900/50 border border-neutral-800 rounded-full overflow-hidden">
                            <button className="flex items-center gap-1 px-3 py-1 hover:bg-emerald-600/70 transition">
                                <ArrowBigUp size={18} />
                                <span>{post.upvotes}</span>
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 hover:bg-rose-600/70 transition">
                                <ArrowBigDown size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/40 border border-neutral-800 text-neutral-300">
                            <MessageSquareQuote size={18} />
                            <span>{post.comments?.length || 0}</span>
                        </div>
                    </div>

                    {/* --- Comment Input --- */}
                    <div className="border-y border-neutral-800 py-6 space-y-3">
                        <textarea
                            className="w-full bg-transparent text-white border border-neutral-800 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-neutral-500"
                            rows={3}
                            placeholder="Share your thoughts..."
                        ></textarea>
                        <div className="flex justify-end">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-sm px-4 py-1.5 rounded-md transition">
                                Comment
                            </button>
                        </div>
                    </div>

                    {/* --- Comments --- */}
                    <div className="space-y-5">
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="pb-4 border-b border-neutral-800 last:border-none"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-emerald-400">
                                            @{comment.user.username}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {new Date(
                                                comment.createdAt,
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-300 leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-500 text-sm text-center py-8">
                                No comments yet. Be the first to join the
                                discussion!
                            </p>
                        )}
                    </div>
                </div>

                <div className="h-10" />
            </main>
        </section>
    );
};

export default PostViewPage;
