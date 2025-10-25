import { CheckCircle2Icon, CircleCheckBig, ClockFading } from "lucide-react";
import React from "react";

const DashboardTaskCard = ({ task }) => {
    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : "No due date";

    return (
        <div
            className={`border rounded-md w-full h-max py-2 px-2 flex items-center justify-between ${
                task.priority === "LOW"
                    ? "bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-600 border-green-800"
                    : task.priority === "MEDIUM"
                    ? "bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-600 border-yellow-800"
                    : "bg-gradient-to-r from-red-50 via-red-100 to-red-600 border-red-800"
            }`}
        >
            <div className="w-2/3">
                <h1 className="text-2xl font-semibold text-black line-clamp-1">
                    {task.title}
                </h1>
                <p className="text-sm line-clamp-1">{task.description}</p>
            </div>

            <div className="flex items-center justify-end gap-5 w-1/3">
                <p className="font-normal text-sm text-black">
                    {formattedDate}
                </p>

                <div>
                    {task.isComplete ? (
                        <CircleCheckBig
                            size={25}
                            className="text-white p-0.5 rounded-full bg-green-800"
                        />
                    ) : (
                        <ClockFading className="text-black" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardTaskCard;
