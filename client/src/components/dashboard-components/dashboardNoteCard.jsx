import React, { useEffect } from "react";

const DashboardNoteCard = ({ note }) => {
    const convertDate = () => {
        const date = new Date(note.createdAt);
        return date.toDateString();
    };

    return (
        <div className="border-b w-full h-max py-2">
            <h1 className="text-2xl font-semibold text-black">{note.title}</h1>
            <p className="text-sm">{convertDate()}</p>
        </div>
    );
};

export default DashboardNoteCard;
