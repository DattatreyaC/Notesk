import {
    ClockPlus,
    EllipsisVertical,
    UserRoundCheck,
    UserRoundPlus,
    UserRoundX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useFriendsStore from "../../store/useFriendsStore";
import { Link } from "react-router-dom";

const UserCard = ({ friend, user }) => {
    const {
        outgoingRequests,
        incomingRequests,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend,
    } = useFriendsStore();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const isFriend =
        user?.friends?.some(
            (f) => f?._id?.toString() === friend?._id?.toString(),
        ) || false;

    const outgoingPending =
        outgoingRequests?.includes(friend?._id?.toString()) || false;
    const incomingPending =
        incomingRequests?.includes(friend?._id?.toString()) || false;

    // Dropdown click outside handler
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target))
                setIsOpen(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="max-w-sm w-full h-max bg-black shadow-[1px_1px_5px_black] rounded-lg p-4 border border-white/10 relative flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white ">
                    {`${friend?.firstname || ""} ${friend?.lastname || ""}`}
                </h2>

                {isFriend ? (
                    <button
                        className="text-white text-sm rounded-full p-1 hover:bg-white/20 duration-200"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen((prev) => !prev);
                        }}
                    >
                        <EllipsisVertical size={18} />
                    </button>
                ) : outgoingPending ? (
                    <button className="text-yellow-400 bg-yellow-700/30 border border-yellow-500/50 rounded p-1 flex items-center justify-center cursor-not-allowed">
                        <ClockPlus size={18} />
                    </button>
                ) : incomingPending ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => acceptFriendRequest(friend._id)}
                            className="text-blue-400 bg-blue-700/30 border border-blue-500/50 rounded p-1 flex items-center justify-center"
                        >
                            <UserRoundCheck size={18} />
                        </button>
                        <button
                            onClick={() => declineFriendRequest(friend._id)}
                            className="text-red-400 bg-red-700/30 border border-red-500/50 rounded p-1 flex items-center justify-center"
                        >
                            <UserRoundX size={18} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => sendFriendRequest(friend._id)}
                        className="text-green-500 bg-green-700/30 border border-green-500/50 rounded p-1 flex items-center gap-2 justify-center duration-200 hover:bg-green-600/40"
                    >
                        <UserRoundPlus size={18} />
                        <p className="text-sm">Add Friend</p>
                    </button>
                )}
            </div>

            <h5 className="text-sm italic text-white/80 font-light ">
                {friend?.username || ""}
            </h5>

            <Link
                to={`/user-profile/${friend.username}`}
                className="text-black py-0.5 px-1 rounded w-fit bg-white text-sm border border-white/50 hover:bg-white/80 duration-200"
            >
                Profile
            </Link>

            {/* Dropdown menu for friends */}
            {isOpen && isFriend && (
                <div
                    ref={menuRef}
                    className="absolute right-3 top-10 w-32 bg-neutral-900 border border-white/10 rounded-md shadow-lg text-white text-sm z-10"
                >
                    <button
                        onClick={() => removeFriend(friend._id)}
                        className="w-full text-left px-3 py-2 hover:bg-red-500/20 text-red-400"
                    >
                        Unfriend
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserCard;
