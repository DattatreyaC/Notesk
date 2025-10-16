import { X, Calendar, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import Loader from "../Loader";
import useTaskStore from "../../store/useTaskStore";

const UpdateTask = ({ isUpdateOpen, setIsUpdateOpen, task }) => {
    const { updateTask, isTaskLoading } = useTaskStore();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate || "");
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);

    const resetForm = () => {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setDueDate(task.dueDate || "");
    };

    const validateForm = () => {
        return title.trim() && description.trim() && priority;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            title,
            description,
            priority,
            dueDate: dueDate || null,
        };

        updateTask(task._id, payload);
        resetForm();
        setShowPriorityMenu(false);
        if (!isTaskLoading) setIsUpdateOpen(false);
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/80 z-40 transition-opacity duration-300 ${
                isUpdateOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className={`flex flex-col bg-neutral-300 w-[90%] max-w-xl max-h-[85vh] rounded-md overflow-hidden border border-neutral-100 transform transition-transform duration-300 ${
                    isUpdateOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                {/* Header */}
                <header className="flex items-center justify-between px-5 py-4 bg-black">
                    <h1 className="text-2xl font-semibold text-white">
                        Add a Task
                    </h1>
                    <button
                        type="button"
                        onClick={() => {
                            resetForm();
                            setIsUpdateOpen(false);
                        }}
                        className="p-1 rounded border border-white/40 text-white hover:bg-white hover:text-black duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Scrollable content */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col overflow-y-auto"
                >
                    {/* Title Input */}
                    <div className="border-b border-stone-600">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-2xl text-black p-4 focus:outline-none placeholder:text-neutral-500"
                            placeholder="Task Title"
                        />
                    </div>

                    {/* Description */}

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full h-[120px] bg-transparent text-black resize-none p-4 focus:outline-none placeholder:text-neutral-500"
                    ></textarea>

                    {/* Priority & Due Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 bg-neutral-200 border-t border-stone-600">
                        {/* Priority dropdown */}
                        <div className="relative w-full sm:w-[48%]">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPriorityMenu(!showPriorityMenu)
                                }
                                className="flex items-center justify-between w-full bg-black text-white px-3 py-2 rounded-md border border-white/30 hover:border-white/60 duration-200"
                            >
                                <span className="font-medium">
                                    Priority: {priority}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${
                                        showPriorityMenu ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {showPriorityMenu && (
                                <div
                                    className="fixed bg-neutral-400 text-black border border-black/30 rounded-md overflow-hidden z-[100] shadow-lg"
                                    style={{
                                        top: "50%", // Adjusted dynamically
                                        left: "50%", // Adjust dynamically to match button
                                        transform: "translate(-50%, 10px)",
                                        width: "calc(100% - 2rem)",
                                        maxWidth: "220px",
                                    }}
                                >
                                    {["LOW", "MEDIUM", "HIGH"].map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => {
                                                setPriority(p);
                                                setShowPriorityMenu(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 hover:bg-neutral-700 hover:text-white duration-150 ${
                                                priority === p
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center gap-2 w-full sm:w-[48%]">
                            <Calendar className="w-5 h-5 text-black/70" />
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-transparent text-black border border-stone-500 rounded-md px-2 py-1 focus:outline-none hover:border-stone-800 cursor-pointer"
                            />
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-3 bg-black border-t border-stone-600">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-green-600 bg-green-700/20 hover:bg-green-600 hover:text-black border border-green-600/30 duration-200 px-4 py-1.5 rounded flex items-center gap-2"
                    >
                        <span>{isTaskLoading ? "Saving" : "Save"}</span>
                        {isTaskLoading && <Loader />}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            resetForm();
                            setIsUpdateOpen(false);
                        }}
                        className="text-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/30 duration-200 px-4 py-1.5 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;
