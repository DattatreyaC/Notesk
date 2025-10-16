import React from "react";

const NoteSkeleton = () => {
    return (
        <div
            className={`w-xs sm:w-[18rem] md:w-[20rem] h-fit rounded-md overflow-hidden bg-black text-white p-1.5  shadow-[3px_3px_7px_black]`}
        >
            {/* title */}
            <div className="w-full font-semibold text-xl p-1.5 pb-0 relative flex items-center animate-pulse">
                <div className="h-5 w-2/4 bg-stone-700 rounded"></div>
                <span className="absolute right-3 h-5 w-5 bg-stone-700 rounded rotate-45"></span>
            </div>

            {/* date */}
            <div className="p-1.5 pt-1 h-sm text-xs animate-pulse">
                <div className="h-3 w-1/3 bg-stone-700 rounded"></div>
            </div>

            {/* actions */}
            <div className="w-full p-1.5 flex items-center justify-between gap-2 animate-pulse">
                {/* globe placeholder */}
                <div className="h-6 w-6 bg-stone-700 rounded-full"></div>

                {/* edit / delete buttons */}
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-stone-700 rounded-full"></div>
                    <div className="h-6 w-6 bg-stone-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default NoteSkeleton;
