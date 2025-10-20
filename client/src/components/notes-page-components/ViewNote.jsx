import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const ViewNote = ({ isViewOpen, setIsViewOpen, note }) => {
    const [title] = useState(note.title);
    const [content] = useState(note.content);
    const [isPublic] = useState(note.isPublic);

    const convertDate = () => {
        const date = new Date(note.createdAt);

        const options = { month: "short", day: "numeric" };

        const monthDay = date.toLocaleDateString(undefined, options);

        const year = date.getFullYear();

        return `${monthDay}, ${year}`;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsViewOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setIsViewOpen]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 cursor-default"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Modal container */}
            <div
                className="flex flex-col w-full max-w-xl h-[70vh] rounded-lg overflow-hidden transform transition-transform duration-300 border border-black/30 shadow-2xl bg-neutral-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="flex items-center justify-between px-5 py-4 bg-black text-white rounded-t-lg">
                    <h1 className="text-2xl font-semibold">Note</h1>
                    <button
                        type="button"
                        onClick={() => setIsViewOpen(false)}
                        className="p-1 rounded border border-white/40 hover:bg-white hover:text-black duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Body */}
                <article className="flex flex-col flex-grow">
                    {/* Title */}
                    <div className="border-b border-black/20">
                        <div className="w-full bg-neutral-300 text-xl text-black font-semibold p-4 focus:outline-none">
                            {title}
                        </div>
                    </div>

                    {/* Content */}
                    <textarea
                        className="flex-grow bg-neutral-300 text-black resize-none p-4 focus:outline-none"
                        value={content}
                        readOnly
                    ></textarea>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-5 py-3 bg-black text-white rounded-b-lg">
                        {/* Visibility */}
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                readOnly
                                className="w-4 h-4 accent-green-500 cursor-pointer"
                            />
                            <span className="text-sm">Public Note</span>
                        </label>

                        {/* Date */}
                        <div className="flex items-center gap-5">
                            <p>{convertDate()}</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ViewNote;
