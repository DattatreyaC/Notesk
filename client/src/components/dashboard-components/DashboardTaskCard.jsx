import React from "react";

const DashboardTaskCard = ({ task }) => {
    const convertDate = () => {
        const date = new Date(task.dueDate);
        return date.toDateString();
    };

    return (
        <div
            className={`border rounded-md w-full h-max py-2 px-2 ${
                task.priority === "LOW"
                    ? "bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-600 border-green-800"
                    : task.priority === "MEDIUM"
                    ? "bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-600 border-yellow-800"
                    : "bg-gradient-to-r from-red-50 via-red-100 to-red-600 border-red-800"
            }`}
        >
            <h1 className="text-2xl font-semibold text-black">{task.title}</h1>
            <p className="text-sm">{convertDate()}</p>
        </div>
    );
};

export default DashboardTaskCard;
