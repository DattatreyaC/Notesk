import { Edit2, Globe, GlobeLock, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import useNoteStore from "../../store/useNoteStore";
import EditNote from "../notes-page-components/EditNote.jsx";
import ViewNote from "./ViewNote.jsx";
import useAuthStore from "../../store/useAuthStore.js";

const NoteCard = ({ note }) => {
    const { deleteNote, pinNote, unpinNote, isNotesLoading } = useNoteStore();
    const { user } = useAuthStore();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const convertDate = () => {
        const date = new Date(note.createdAt);
        return date.toDateString();
    };

    const handlePin = (id) => {
        pinNote(id);
    };
    const handleUnpin = (id) => {
        unpinNote(id);
    };

    const handleDelete = (id) => {
        deleteNote(id);
    };

    return (
        <div
            onClick={() => setIsViewOpen(true)}
            className={`w-xs sm:w-[18rem] md:w-[20rem] h-fit rounded-md overflow-hidden bg-black text-white p-1 group cursor-pointer ${
                note.isPinned
                    ? "outline-2 outline-offset-2 outline-black"
                    : "shadow-[3px_3px_7px_black]"
            }`}
        >
            {/* title */}
            <div className="w-full font-semibold text-xl p-1.5 pb-0 relative flex items-center">
                <h1 className="line-clamp-1">{note.title}</h1>

                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        note.isPinned
                            ? handleUnpin(note._id)
                            : handlePin(note._id);
                    }}
                    className="absolute w-fit h-fit right-3 cursor-pointer rounded-full p-1 overflow-hidden rotate-45 hover:bg-neutral-300/20 duration-200 text-xl"
                >
                    {note.isPinned ? (
                        <MdPushPin className="rounded-full" />
                    ) : (
                        <MdOutlinePushPin />
                    )}
                </span>
            </div>

            {/* date */}
            <div className="p-1.5 pt-0 h-sm text-xs">{convertDate()}</div>

            {/* actions */}
            <div className="w-full p-1.5 flex items-center justify-between gap-2">
                <div>
                    {note.isPublic ? (
                        <Globe size={22} className="text-emerald-500" />
                    ) : (
                        <GlobeLock size={22} className="text-stone-400" />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditOpen(true);
                        }}
                        className="bg-blue-400/20 border border-blue-400/30 p-1.5 rounded-full hover:bg-blue-400/30 duration-200"
                    >
                        <Edit2 size={15} className="text-blue-300" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(note._id);
                        }}
                        className="bg-red-400/20 border border-red-400/30 p-1.5 rounded-full hover:bg-red-400/30 duration-200"
                    >
                        <Trash2 size={15} className="text-red-500" />
                    </button>
                </div>
            </div>

            {isEditOpen && (
                <EditNote
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    note={note}
                />
            )}

            {isViewOpen && (
                <ViewNote
                    isViewOpen={isViewOpen}
                    setIsViewOpen={setIsViewOpen}
                    note={note}
                />
            )}
        </div>
    );
};

export default NoteCard;
