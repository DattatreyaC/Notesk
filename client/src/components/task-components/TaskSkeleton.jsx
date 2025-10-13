import React from "react";

const TaskSkeleton = () => {
    return (
        <div className="border border-neutral-800 bg-neutral-900 rounded-md p-4 shadow-md flex flex-col gap-3">
            {/* Skeleton Header */}
            <div className="flex items-start justify-between animate-pulse">
                {/* Title Skeleton */}
                <div className="h-6 bg-neutral-700 rounded w-3/4"></div>
                {/* Priority Icon Skeleton */}
                <div className="h-6 w-6 bg-neutral-700 rounded-full shrink-0"></div>
            </div>

            {/* Skeleton Description */}
            <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-neutral-700 rounded w-full"></div>
                <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
            </div>

            {/* Skeleton Footer */}
            <div className="flex items-center justify-between mt-auto pt-2 animate-pulse">
                {/* Date Skeleton */}
                <div className="h-4 bg-neutral-700 rounded w-1/3"></div>

                {/* Buttons Skeleton */}
                <div className="flex items-center gap-2">
                    <div className="h-7 w-20 bg-neutral-700 rounded"></div>
                    <div className="h-7 w-20 bg-neutral-700 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default TaskSkeleton;
