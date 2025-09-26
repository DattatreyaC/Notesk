import { Edit2, Globe, GlobeLock, Trash2 } from "lucide-react";
import React from "react";
import { LuPin } from "react-icons/lu";

const NoteCard = ({ note }) => {
    return (
        <div className="border w-xs h-fit rounded overflow-hidden">
            {/* title */}
            <div className="w-full text-center bg-gradient-to-r from-yellow-300 to-yellow-100 font-semibold text-lg p-1 border-b relative flex items-center justify-center">
                {note.title}

                <span className="absolute w-fit h-fit right-3 cursor-pointer rounded overflow-hidden">
                    <LuPin />
                </span>
            </div>

            {/* content */}
            <div className="p-1 h-sm">{note.content}</div>

            {/* actions */}
            <div className="w-full border-t p-1 flex items-center justify-between gap-2 bg-slate-800">
                <div>
                    {note.isPublic ? (
                        <Globe className="text-emerald-500" />
                    ) : (
                        <GlobeLock className="text-stone-400" />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button>
                        <Edit2 className="text-blue-400" />
                    </button>

                    <button>
                        <Trash2 className="text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
