import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePostStore from "../store/usePostStore";
import {
    ArrowBigUp,
    ArrowBigDown,
    MessageSquareQuote,
    Dot,
} from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Loader from "../components/Loader";
import useAuthStore from "../store/useAuthStore";
import MediaCarousel from "../components/MediaCarousel";

const PostViewPage = () => {
    const { id } = useParams();
    const { user } = useAuthStore();

    const {
        fetchPostById,
        isPostsLoading,
        post,
        starPost,
        unStarPost,
        setStarredPosts,
        upvotePost,
        revertUpvotePost,
        downvotePost,
        revertDownvotePost,
    } = usePostStore();

    const [isStarred, setIsStarred] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [starCount, setStarCount] = useState(0);

    /** ----------------- DATE UTILS ----------------- */
    const calculateDay = () => {
        if (!post?.createdAt) return "";
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

    /** ----------------- STAR HANDLERS ----------------- */

    const handleStar = async () => {
        const success = await starPost(post._id);
        if (success) {
            setIsStarred(true);
            setStarCount((prev) => prev + 1);
        }
    };

    const handleUnStar = async () => {
        const success = await unStarPost(post._id);
        if (success) {
            setIsStarred(false);
            setStarCount((prev) => prev - 1);
        }
    };

    const handleUpvote = async () => {
        const success = await upvotePost(post._id);
        if (success) {
            if (isDownvoted) {
                handleRevertDownvote();
            }
            setUpvotes((prev) => prev + 1);
            setIsUpvoted(true);
        }
    };

    const handleRevertUpvote = async () => {
        const success = await revertUpvotePost(post._id);
        if (success) {
            setUpvotes((prev) => prev - 1);
            setIsUpvoted(false);
        }
    };

    const handleDownVote = async () => {
        const success = await downvotePost(post._id);
        if (success) {
            if (isUpvoted) {
                handleRevertUpvote();
            }
            setIsDownvoted(true);
        }
    };

    const handleRevertDownvote = async () => {
        const success = await revertDownvotePost(post._id);
        if (success) {
            setIsDownvoted(false);
        }
    };

    /** ----------------- FETCH EFFECT ----------------- */
    useEffect(() => {
        if (!user) return;

        const load = async () => {
            setStarredPosts(user.starredPosts);
            await fetchPostById(id);
        };

        load();
    }, [id, user]);

    /** ----------------- WHEN POST UPDATES ----------------- */
    useEffect(() => {
        if (!post || !user) return;

        setUpvotes(post.upvotes?.length || 0);
        setIsUpvoted(post.upvotes?.includes(user._id));
        setIsDownvoted(post.downvotes.includes(user._id));

        // Use SERVER TRUTH, not client starredPosts
        setIsStarred(post.stars?.includes(user._id));
        setStarCount(post.stars?.length || 0);
    }, [post, user]);

    /** ----------------- LOADING STATES ----------------- */
    if (isPostsLoading) {
        return (
            <section className="bg w-full h-screen flex items-center justify-center pl-14 py-5 pr-1">
                <div className="w-full h-fit space-y-3 text-center">
                    <Loader />
                    <span>
                        <p className="font-semibold text-xl">Loading post.</p>
                        <p>Please wait...</p>
                    </span>
                </div>
            </section>
        );
    }

    if (!post) {
        return (
            <section className="bg w-full h-screen flex items-center justify-center pl-12 py-5 pr-1">
                <p className="text-neutral-400 text-lg font-medium">
                    Post not found ❌
                </p>
            </section>
        );
    }

    /** ----------------- MAIN UI ----------------- */
    return (
        <section className="bg w-full h-screen flex flex-col pl-12 py-5 pr-1 overflow-y-auto">
            <main className="flex flex-col items-center w-full">
                <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-neutral-950 text-white rounded-xl p-6 space-y-8">
                    {/* HEADER */}
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/user-profile/${
                                    post.user?.username ?? ""
                                }`}
                                className="text-sm text-emerald-400 font-medium hover:underline"
                            >
                                @{post.user?.username}
                            </Link>

                            <Dot />

                            <span className="text-xs text-neutral-500">
                                {calculateDay()}
                            </span>
                        </div>

                        {/* STAR BUTTON */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                isStarred ? handleUnStar() : handleStar();
                            }}
                            className="group flex items-center gap-2 rounded-full border border-neutral-700/70 bg-neutral-700/40 hover:bg-neutral-700/40 px-1 py-0.5 transition-colors"
                        >
                            <div
                                className={`p-1 rounded-md ${
                                    isStarred
                                        ? "text-amber-400"
                                        : "text-neutral-300 group-hover:text-amber-300"
                                }`}
                            >
                                {isStarred ? <FaStar /> : <FaRegStar />}
                            </div>

                            <div className="w-px h-4 bg-neutral-600"></div>

                            <span className="text-sm text-neutral-300 min-w-[1.5rem] pr-2 text-center">
                                {starCount}
                            </span>
                        </button>
                    </header>

                    {/* TITLE + CONTENT */}
                    <div className="space-y-3">
                        <h1 className="text-3xl font-extrabold">
                            {post.title}
                        </h1>

                        {post.media?.length > 0 && (
                            <div className="w-full rounded-lg">
                                <MediaCarousel media={post.media} />
                            </div>
                        )}

                        <p className="text-base text-neutral-300">
                            {post.content}
                        </p>
                    </div>

                    {/* INTERACTIONS */}
                    <div className="flex items-center gap-4 text-sm pt-5 border-t border-neutral-800">
                        {/* Upvotes */}
                        <div className="flex items-center bg-neutral-900/50 border border-neutral-800 rounded-full overflow-hidden">
                            <button
                                className={`flex items-center gap-1 px-2 py-1 transition ${
                                    isUpvoted
                                        ? "bg-white text-black hover:bg-white/70"
                                        : "hover:bg-white/10"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    isUpvoted
                                        ? handleRevertUpvote()
                                        : handleUpvote();
                                }}
                            >
                                <ArrowBigUp size={18} />
                                <span>{upvotes}</span>
                            </button>
                            <button
                                className={`flex items-center gap-1 px-2 py-1 h-full duration-200 transition ${
                                    isDownvoted
                                        ? "bg-white text-black hover:bg-white/70"
                                        : "hover:bg-white/10"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    isDownvoted
                                        ? handleRevertDownvote()
                                        : handleDownVote();
                                }}
                            >
                                <ArrowBigDown size={18} />
                            </button>
                        </div>

                        {/* Comments count */}
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/40 border border-neutral-800">
                            <MessageSquareQuote size={18} />
                            <span>{post.comments?.length || 0}</span>
                        </div>
                    </div>

                    {/* COMMENT INPUT */}
                    <div className="border-y border-neutral-800 py-6 space-y-3">
                        <textarea
                            className="w-full bg-transparent text-white border border-neutral-800 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-emerald-500"
                            rows={3}
                            placeholder="Share your thoughts..."
                        ></textarea>
                        <div className="flex justify-end">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-sm px-4 py-1.5 rounded-md">
                                Comment
                            </button>
                        </div>
                    </div>

                    {/* COMMENTS */}
                    <div className="space-y-5">
                        {post.comments?.length > 0 ? (
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
                                    <p className="text-sm text-neutral-300">
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
