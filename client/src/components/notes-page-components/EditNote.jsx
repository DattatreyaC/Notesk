import { X } from "lucide-react";
import React, { useState } from "react";
import useNoteStore from "../../store/useNoteStore";
import Loader from "../Loader";

const CreateNote = ({ isEditOpen, setIsEditOpen, note }) => {
    const { editNote, isNotesLoading } = useNoteStore();

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isPublic, setIsPublic] = useState(note.isPublic);

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

            editNote(note._id, payload);

            if (!isNotesLoading) setIsEditOpen(false);
        }
    };

    const resetValues = () => {
        setTitle(note.title);
        setContent(note.content);
        setIsPublic(note.isPublic);
    };

    return (
        // Overlay (only visible when open)
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/70 transition-opacity duration-300 z-50 ${
                isEditOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            {/* Modal container */}
            <div
                className={`flex flex-col w-full max-w-xl h-[70vh] rounded-lg overflow-hidden transform transition-transform duration-300 border border-black/30 shadow-2xl ${
                    isEditOpen ? "translate-y-0" : "translate-y-full"
                } bg-neutral-200`}
            >
                {/* Header */}
                <header className="flex items-center justify-between px-5 py-4 bg-black text-white rounded-t-lg">
                    <h1 className="text-2xl font-semibold">Edit Note</h1>
                    <button
                        type="button"
                        onClick={() => {
                            resetValues();
                            setIsEditOpen(false);
                        }}
                        className="p-1 rounded border border-white/40 hover:bg-white hover:text-black duration-200"
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
                    <div className="border-b border-black/20">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-neutral-300 text-xl text-black p-4 focus:outline-none"
                            placeholder="Input Title Here"
                        />
                    </div>

                    {/* Content Textarea */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter the contents of your note..."
                        className="flex-grow bg-neutral-300 text-black resize-none p-4 focus:outline-none"
                    ></textarea>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between px-5 py-3 bg-black text-white rounded-b-lg">
                        {/* Visibility option */}
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="w-4 h-4 accent-green-500 cursor-pointer"
                            />
                            <span className="text-sm">Make Public</span>
                        </label>

                        {/* Buttons */}
                        <div className="flex items-center gap-5">
                            <button
                                type="submit"
                                className="text-green-600 bg-green-700/20 hover:bg-green-600 hover:text-black border border-green-600/30 duration-200 p-1.5 rounded flex gap-2"
                            >
                                <span>
                                    {isNotesLoading ? "Saving" : "Save"}
                                </span>
                                {isNotesLoading && <Loader />}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    resetValues();
                                    setIsEditOpen(false);
                                }}
                                className="text-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/30 duration-200 p-1.5 rounded"
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
