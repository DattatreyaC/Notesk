import { X, Play, ImageUp } from "lucide-react";
import { useState } from "react";
import Loader from "../Loader";
import usePostStore from "../../store/usePostStore";
import { BiSolidImageAdd } from "react-icons/bi";

const CreatePost = ({ isCreateOpen, setIsCreateOpen }) => {
    const { createPost, isPostsLoading } = usePostStore();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]); // selected files
    const [error, setError] = useState("");

    const resetForm = () => {
        setTitle("");
        setContent("");
        setError("");
        setMediaFiles([]);
    };

    const validateForm = () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
            "image/gif",
            "video/mp4",
            "video/mov",
            "video/quicktime",
            "video/avi",
            "video/mkv",
        ];

        const validFiles = files.filter((file) =>
            allowedTypes.includes(file.type),
        );

        if (validFiles.length + mediaFiles.length > 3) {
            setError("You can upload a maximum of 3 media files.");
            return;
        }

        setError("");
        setMediaFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        const updated = [...mediaFiles];
        updated.splice(index, 1);
        setMediaFiles(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            title: title.trim(),
            content: content.trim(),
            media: mediaFiles,
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

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col overflow-y-auto"
                >
                    {/* Title */}
                    <div className="border-b border-stone-600">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-2xl text-black p-4 focus:outline-none placeholder:text-neutral-500"
                            placeholder="Post Title"
                        />
                    </div>

                    {/* Content */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        className="w-full h-[200px] bg-transparent text-black resize-none p-4 focus:outline-none placeholder:text-neutral-500"
                    ></textarea>

                    {/* Media Upload */}
                    <div className="px-4 pb-3 border-t border-stone-400">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Upload up to 3 images or videos
                        </label>

                        <label htmlFor="media">
                            {/* <ImageUp className="border" /> */}
                            <span className="flex items-center gap-1 rounded-full w-fit px-2.5 py-1 bg-black text-white hover:bg-neutral-900 duration-200">
                                <BiSolidImageAdd className="text-[1.75rem]" />
                                <p className="text-sm font-light">Upload</p>
                            </span>

                            <input
                                id="media"
                                type="file"
                                accept="image/*,video/*"
                                name="media"
                                hidden
                                multiple
                                onChange={handleFileChange}
                                className="block w-full text-sm text-neutral-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
                            />
                        </label>

                        {/* Media Previews */}
                        {mediaFiles.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-3">
                                {mediaFiles.map((file, index) => {
                                    const isVideo =
                                        file.type.startsWith("video");
                                    const previewURL =
                                        URL.createObjectURL(file);

                                    return (
                                        <div
                                            key={index}
                                            className="relative w-24 h-24 rounded-md overflow-hidden border border-stone-500 bg-black/20"
                                        >
                                            {isVideo ? (
                                                <div className="relative w-full h-full flex items-center justify-center bg-black/60">
                                                    <video
                                                        src={previewURL}
                                                        className="object-cover w-full h-full opacity-70"
                                                    />
                                                    <Play className="absolute w-6 h-6 text-white opacity-90" />
                                                </div>
                                            ) : (
                                                <img
                                                    src={previewURL}
                                                    alt={`preview-${index}`}
                                                    className="object-cover w-full h-full"
                                                />
                                            )}

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

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
