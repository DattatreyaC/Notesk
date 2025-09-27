import { X } from "lucide-react";
import React, { useState } from "react";
import useNoteStore from "../../store/useNoteStore";

const CreateNote = ({ isCreateOpen, setIsCreateOpen }) => {
    const { createNote, isNotesLoading } = useNoteStore();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const validateForm = () => {
        if (!title || !content) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const payload = {
                title,
                content,
                isPublic,
            };
            createNote(payload);

            setTitle("");
            setContent("");
            setIsPublic(false);
            setIsCreateOpen(false);
        }
    };

    return (
        // Overlay (only visible when open)
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/80 transition-opacity duration-300 z-50 ${
                isCreateOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            {/* Modal container */}
            <div
                className={`flex flex-col bg-stone-800 w-full max-w-2xl h-[80vh] rounded-md overflow-hidden transform transition-transform duration-300 border ${
                    isCreateOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                {/* Header */}
                <header className="flex items-center justify-between px-5 py-4 bg-black">
                    <h1 className="text-2xl font-semibold text-white">
                        Create a Note
                    </h1>
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(false)}
                        className="p-1 rounded border border-white/40 text-white hover:bg-white hover:text-black duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-grow"
                >
                    {/* Title Input */}
                    <div className="border-b border-stone-600">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-2xl text-white p-4 focus:outline-none"
                            placeholder="Input Title Here"
                        />
                    </div>

                    {/* Content Textarea */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter the contents of your note..."
                        className="flex-grow bg-transparent text-white resize-none p-4 focus:outline-none"
                    ></textarea>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between px-5 py-3 bg-black border-t border-stone-600">
                        {/* Visibility option */}
                        <label className="flex items-center gap-2 text-white cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="w-4 h-4 accent-red-500 cursor-pointer"
                            />
                            <span className="text-sm">Make Public</span>
                        </label>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                className="text-black bg-white hover:bg-white/80 duration-200 font-semibold p-1.5 rounded"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                                className="text-black bg-white hover:bg-white/80 duration-200 font-semibold p-1.5 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
