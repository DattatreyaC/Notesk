import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFriendsStore from "../store/useFriendsStore";
import { ArrowLeft, CircleUserRound, Loader } from "lucide-react";
import UserNotes from "../components/friends-components/UserNotes";

const UserProfile = () => {
    const { username } = useParams();
    const { userProfile, getProfileByUsername, friendsLoading } =
        useFriendsStore();

    const [activeTab, setActiveTab] = useState("Notes");

    useEffect(() => {
        if (username) getProfileByUsername(username);
    }, [username, getProfileByUsername]);

    if (friendsLoading) {
        return (
            <section className="bg w-full h-screen flex flex-col pl-12 pr-1 overflow-y-auto relative overflow-x-hidden items-center justify-center">
                <Loader className="animate-spin" size={40} />
            </section>
        );
    }

    if (!userProfile) {
        return (
            <section className="bg w-full h-screen flex flex-col pl-12 pr-1 overflow-y-auto relative overflow-x-hidden items-center justify-center text-neutral-700">
                <CircleUserRound size={80} strokeWidth={1} className="mb-3" />
                <h2 className="text-2xl font-semibold mb-2">User not found</h2>
                <Link
                    to="/friends"
                    className="flex items-center gap-2 text-sm border border-black/40 rounded-md px-3 py-1 hover:bg-black/10 transition"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </Link>
            </section>
        );
    }

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 pr-1 overflow-y-auto relative overflow-x-hidden">
            <main className="w-full h-full flex items-center justify-center relative">
                {/* Go Back Button */}
                <Link
                    to="/friends"
                    className="absolute flex items-center gap-1 top-5 left-5 p-2 rounded-full text-sm hover:bg-white/10 transition"
                >
                    <ArrowLeft />
                    <span>Go Back</span>
                </Link>

                {/* Profile Content */}
                <article className="flex flex-col gap-3 w-full sm:w-lg md:w-xl">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 border-b pb-3">
                        <div className="rounded-full overflow-hidden border border-neutral-400/50 size-23 place-content-center">
                            {userProfile.profilePicture ? (
                                <img
                                    src={userProfile.profilePicture?.url}
                                    alt="Profile Picture"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <p className="text-white text-[0.5rem] text-center">
                                    No image
                                </p>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold">
                            {userProfile?.firstname} {userProfile?.lastname}
                        </h1>
                    </div>

                    {/* Username + Email */}
                    <div className="px-1 space-y-1">
                        <h2 className=" text-neutral-900 font-semibold">
                            Username :{" "}
                            <span className="text-neutral-700 font-normal">
                                {userProfile?.username}
                            </span>
                        </h2>
                        <p className="text-neutral-900 font-semibold">
                            Email :{" "}
                            <span className="text-neutral-700 font-normal">
                                {userProfile?.email}
                            </span>
                        </p>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="w-full border border-b-0 rounded-t px-2.5 py-1.5 bg-black/85 flex items-center gap-3 shadow-[2px_2px_5px_gray]">
                            <button
                                onClick={() => setActiveTab("Notes")}
                                className={` py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                                    activeTab === "Notes"
                                        ? "bg-neutral-200 text-black"
                                        : "hover:bg-white/30 bg-transparent text-white"
                                }`}
                            >
                                Notes
                            </button>

                            <button
                                onClick={() => setActiveTab("Posts")}
                                className={` py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                                    activeTab === "Posts"
                                        ? "bg-white text-black"
                                        : "hover:bg-white/30 bg-transparent text-white"
                                }`}
                            >
                                Posts
                            </button>
                        </div>

                        {/* Content */}
                        <div className="w-full  min-h-50 max-h-60 bg-neutral-300 border border-t-0 border-neutral-600 rounded-b-md p-1 overflow-auto flex flex-col items-center justify-center">
                            {activeTab === "Notes" ? (
                                <UserNotes notes={userProfile?.notes} />
                            ) : (
                                <div className="text-neutral-700 italic">
                                    No posts to display
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </main>
        </section>
    );
};

export default UserProfile;
