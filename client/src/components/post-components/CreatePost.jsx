import { X } from "lucide-react";
import { useState } from "react";
import Loader from "../Loader";
import usePostStore from "../../store/usePostStore";

const CreatePost = ({ isCreateOpen, setIsCreateOpen }) => {
    const { createPost, isPostsLoading } = usePostStore();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    // Reset the form fields
    const resetForm = () => {
        setTitle("");
        setContent("");
        setError("");
    };

    // validation
    const validateForm = () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return false;
        }
        return true;
    };

    // handle SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            title: title.trim(),
            content: content.trim(),
        };

        try {
            if ((await createPost(payload)) === true) {
                resetForm();
                setIsCreateOpen(false);
            }
        } catch (err) {
            setError("Failed to create post. Please try again.");
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/80 z-40 transition-opacity duration-300 ${
                isCreateOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className={`flex flex-col bg-neutral-300 w-full max-w-xl max-h-[85vh] rounded-md overflow-hidden border border-neutral-100 transform transition-transform duration-300 ${
                    isCreateOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                {/* Header */}
                <header className="flex items-center justify-between px-5 py-4 bg-black">
                    <h1 className="text-2xl font-semibold text-white">
                        Create a new Post
                    </h1>
                    <button
                        type="button"
                        onClick={() => {
                            resetForm();
                            setIsCreateOpen(false);
                        }}
                        className="p-1 rounded border border-white/40 text-white hover:bg-white hover:text-black duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Scrollable content */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col overflow-y-auto"
                >
                    {/* Title Input */}
                    <div className="border-b border-stone-600">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-2xl text-black p-4 focus:outline-none placeholder:text-neutral-500"
                            placeholder="Post Title"
                        />
                    </div>

                    {/* Description */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        className="w-full h-[200px] bg-transparent text-black resize-none p-4 focus:outline-none placeholder:text-neutral-500"
                    ></textarea>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 text-sm px-4 pb-2 font-medium">
                            {error}
                        </p>
                    )}
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-3 bg-black border-t border-stone-600">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isPostsLoading}
                        className="text-green-600 bg-green-700/20 hover:bg-green-600 hover:text-black border border-green-600/30 duration-200 px-4 py-1.5 rounded flex items-center gap-2 disabled:opacity-50"
                    >
                        {isPostsLoading ? <Loader /> : "Create Post"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            resetForm();
                            setIsCreateOpen(false);
                        }}
                        className="text-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/30 duration-200 px-4 py-1.5 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
