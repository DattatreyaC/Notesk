import React from "react";
import UserNoteCard from "../notes-page-components/UserNoteCard.jsx";

const UserNotes = ({ notes }) => {
    if (!notes || notes.length === 0) {
        return (
            <div className="w-full rounded bg-neutral-300 roundedounded-md p-3 overflow-auto flex items-center justify-center text-neutral-700 italic">
                No public notes to display
            </div>
        );
    }

    return (
        <div className="w-full max-h-60 border-neutral-600 rounded-md p-2 overflow-auto space-y-3 place-items-center scrollbar-hide bg-neutral-300">
            {notes.map((note) => (
                <UserNoteCard key={note._id} note={note} />
            ))}
        </div>
    );
};

export default UserNotes;
