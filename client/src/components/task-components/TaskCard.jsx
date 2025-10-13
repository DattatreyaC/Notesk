import React from "react";
import { Trash2, Calendar, Pencil } from "lucide-react";
import { FaCircle } from "react-icons/fa6";
import useTaskStore from "../../store/useTaskStore";

const priorityStyles = {
    LOW: {
        container: "bg-green-500/20",
        icon: "text-green-500/80",
    },
    MEDIUM: {
        container: "bg-amber-500/20",
        icon: "text-amber-500/80",
    },
    HIGH: {
        container: "bg-red-500/20",
        icon: "text-red-500/80",
    },
};

const TaskCard = ({ task }) => {
    const { updateTask, deleteTask, isTasksLoading } = useTaskStore();

    const currentPriorityStyles =
        priorityStyles[task.priority] || priorityStyles.HIGH;

    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "No due date";

    const handleToggleComplete = () => {
        updateTask(task._id, { ...task, isComplete: !task.isComplete }, true);
    };

    return (
        <article
            className={`border border-neutral-700 rounded-md p-4 shadow-md hover:shadow-lg transition flex flex-col gap-3
            ${
                task.isComplete
                    ? "bg-neutral-800 line-through text-neutral-500"
                    : "bg-black text-white"
            }`}
        >
            {/* Header */}
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold break-words pr-2">
                    {task.title}
                </h3>

                <div className="flex items-center gap-2">
                    {/* Due Date */}
                    <div className="flex items-center gap-1 text-sm text-neutral-400">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                    </div>

                    {/* Priority */}
                    {task.priority && (
                        <span
                            className={`text-xs font-medium text-neutral-300 flex items-center p-1 border border-neutral-600 rounded-full shrink-0 ${currentPriorityStyles.container}`}
                        >
                            <FaCircle className={currentPriorityStyles.icon} />
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-sm line-clamp-2">{task.description}</p>
            )}

            {/* Footer: Complete Checkbox */}
            <div className=" flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-sm text-neutral-300">
                        <input
                            type="checkbox"
                            checked={task.isComplete}
                            onChange={handleToggleComplete}
                            disabled={isTasksLoading}
                            className="w-4 h-4 rounded border-neutral-500 bg-black accent-green-500 cursor-pointer"
                        />
                        {task.isComplete ? "Completed" : "Incomplete"}
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="     flex items-center justify-end text-sm text-neutral-400 mt-auto gap-2">
                    <button
                        disabled={isTasksLoading}
                        className="flex items-center gap-1 text-blue-400 hover:bg-blue-600/20 border border-blue-500/30 px-2 py-1 rounded text-xs transition  disabled:cursor-not-allowed"
                        aria-label={`Update task: ${task.title}`}
                    >
                        <Pencil size={14} />
                        Update
                    </button>

                    <button
                        onClick={() => deleteTask(task._id)}
                        disabled={isTasksLoading}
                        className="flex items-center gap-1 text-red-400 hover:bg-red-600/20 border border-red-500/30 px-2 py-1 rounded text-xs transition  disabled:cursor-not-allowed"
                        aria-label={`Delete task: ${task.title}`}
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
