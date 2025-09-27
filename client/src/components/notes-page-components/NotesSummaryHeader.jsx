import React from "react";
import { CirclePlus } from "lucide-react";

const NotesSummaryHeader = ({ isCreateOpen, setIsCreateOpen }) => {
    return (
        <div className="w-full flex items-center justify-around border-b border-t">
            <div>
                <h1>Total Notes : </h1>
                <h1>Public : </h1>
                <h1>Private : </h1>
            </div>
            <div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-black p-2 rounded text-white flex gap-2 group cursor-pointer"
                >
                    <CirclePlus className="group-hover:rotate-90 duration-200" />
                    ADD NOTE
                </button>
            </div>
        </div>
    );
};

export default NotesSummaryHeader;
