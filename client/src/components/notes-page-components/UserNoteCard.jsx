import { Globe, GlobeLock } from "lucide-react";
import { useState } from "react";
import ViewNote from "./ViewNote.jsx";

const NoteCard = ({ note }) => {
    const [isViewOpen, setIsViewOpen] = useState(false);

    const convertDate = () => {
        const date = new Date(note.createdAt);
        return date.toDateString();
    };

    return (
        <div
            onClick={() => setIsViewOpen(true)}
            className={`w-full sm:w-[18rem] md:w-[20rem] h-fit rounded-md overflow-hidden bg-black text-white p-1 group cursor-pointer shadow-[3px_3px_7px_black] `}
        >
            {/* title */}
            <div className="w-full font-semibold text-xl p-1.5 pb-0 relative flex items-center">
                {note.title}
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
            </div>

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
