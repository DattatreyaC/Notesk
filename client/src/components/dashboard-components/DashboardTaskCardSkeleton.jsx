import { CheckCircle2Icon, CircleCheckBig, ClockFading } from "lucide-react";
import React from "react";

const DashboardTaskCardSkeleton = () => {
    return (
        <div
            className={`border rounded-md w-full h-[4.5rem] py-2 px-2 flex items-center justify-between bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-800`}
        >
            <div className="w-2/3 space-y-1.5 ">
                <h1 className="bg-neutral-700 w-2/3 h-[1.35rem] animate-pulse rounded"></h1>
                <p className="w-2/4 h-[1rem] bg-neutral-700 animate-pulse rounded"></p>
            </div>

            <div className="flex items-center justify-end gap-5 w-1/3">
                <p className="w-2/4 h-[1rem] bg-neutral-600 animate-pulse rounded"></p>
                <div className="bg-neutral-600 size-6 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default DashboardTaskCardSkeleton;
