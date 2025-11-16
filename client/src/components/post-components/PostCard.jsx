import {
    ArrowBigDown,
    ArrowBigUp,
    EllipsisVertical,
    MessageSquareText,
    Star,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import usePostStore from "../../store/usePostStore";
import MediaCarousel from "../MediaCarousel";

const PostCard = ({ post, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const { deletePost, isPostsLoading } = usePostStore();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="max-w-lg w-full bg-black shadow-[1px_1px_5px_black] rounded-lg p-4 border border-white/10 relative">
            {/* Title + Menu Button */}
            <div className="w-full flex items-center justify-between ">
                <h2 className="text-xl md:text-2xl font-semibold text-white line-clamp-1 mb-2">
                    {post.title}
                </h2>

                <button
                    className="text-white text-sm rounded-full p-1 hover:bg-white/20 duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                >
                    <EllipsisVertical size={18} />
                </button>
            </div>

            {/* MEDIA Carousel */}
            {post.media?.length > 0 && (
                <div className="w-full rounded-md">
                    <MediaCarousel media={post.media} />
                </div>
            )}

            {/* Content (preview) */}
            <p className="text-white/80 mb-3 line-clamp-1">{post.content}</p>

            {/* Public/Private Badge */}
            {/* <span
                className={`inline-block px-3 py-0.5 text-xs rounded-full mb-3 ${
                    post.isPublic
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "bg-red-400/20 text-red-400 border border-red-400/30"
                }`}
            >
                {post.isPublic ? "Public" : "Private"}
            </span> */}

            {/* Stats */}
            <div className="flex items-center gap-6 mb-3 text-white/90">
                <div className="flex gap-1 text-sm items-center">
                    <ArrowBigUp
                        size={20}
                        strokeWidth={1.5}
                        className="text-lime-500"
                    />{" "}
                    <span className="text-neutral-300">
                        {post.upvotes.length}
                    </span>
                </div>
                <div className="flex gap-1 text-sm items-center">
                    <ArrowBigDown
                        size={20}
                        strokeWidth={1.5}
                        className="text-rose-800"
                    />{" "}
                    <span className="text-neutral-300">
                        {post.downvotes.length}
                    </span>
                </div>
                <div className="flex gap-1 text-sm items-center">
                    <Star
                        size={20}
                        strokeWidth={1.5}
                        className="text-amber-500"
                    />{" "}
                    <span className="text-neutral-300">
                        {post.stars?.length}
                    </span>
                </div>
                <div className="flex gap-1 text-sm items-center">
                    <MessageSquareText
                        size={20}
                        strokeWidth={1.5}
                        className="text-sky-200"
                    />{" "}
                    <span className="text-neutral-300">
                        {post.comments?.length || 0}
                    </span>
                </div>
            </div>

            {/* Timestamps */}
            <div className="text-xs text-gray-400 mt-3 border-t border-t-neutral-400/30 pt-1">
                Created: {new Date(post.createdAt).toLocaleString()}
                <br />
                Updated: {new Date(post.updatedAt).toLocaleString()}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-3 top-10 w-32 bg-neutral-900 border border-white/10 rounded-md shadow-lg text-white text-sm z-10"
                >
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onEdit?.(post);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-white/10"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            deletePost(post._id);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-red-500/20 text-red-400"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostCard;
