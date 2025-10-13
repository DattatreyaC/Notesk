import { CirclePlus } from "lucide-react";
import React from "react";

const TasksHeader = ({ setIsCreateOpen }) => {
    return (
        <div className="w-full py-5 ">
            <div className="flex items-center justify-end">
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-black p-2 rounded text-white flex gap-2 group cursor-pointer"
                >
                    <CirclePlus className="group-hover:rotate-90 duration-200" />
                    ADD TASK
                </button>
            </div>
        </div>
    );
};

export default TasksHeader;
