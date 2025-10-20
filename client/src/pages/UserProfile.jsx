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

    // ✅ Re-fetch profile when username changes
    useEffect(() => {
        if (username) getProfileByUsername(username);
    }, [username, getProfileByUsername]);

    // ✅ Loading State
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
                        <CircleUserRound size={80} strokeWidth={1} />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold">
                            {userProfile?.firstname} {userProfile?.lastname}
                        </h1>
                    </div>

                    {/* Username + Email */}
                    <div className="px-1 space-y-1">
                        <h2 className="italic text-neutral-900 font-semibold">
                            @{userProfile?.username}
                        </h2>
                        <p className="text-neutral-700">{userProfile?.email}</p>
                    </div>

                    {/* Tabs */}
                    <div className="w-full border rounded px-2.5 py-1.5 bg-black flex items-center gap-3">
                        <button
                            onClick={() => setActiveTab("Notes")}
                            className={`border border-white/50 py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                                activeTab === "Notes"
                                    ? "bg-white text-black"
                                    : "hover:bg-white/30 bg-black text-white"
                            }`}
                        >
                            Notes
                        </button>

                        <button
                            onClick={() => setActiveTab("Posts")}
                            className={`border border-white/50 py-1 px-1.5 rounded font-semibold cursor-pointer duration-200 ${
                                activeTab === "Posts"
                                    ? "bg-white text-black"
                                    : "hover:bg-white/30 bg-black text-white"
                            }`}
                        >
                            Posts
                        </button>
                    </div>

                    {/* Content */}
                    <div className="w-full  min-h-50 max-h-60 bg-neutral-300 border border-neutral-600 rounded-md p-1 overflow-auto flex flex-col items-center justify-center">
                        {activeTab === "Notes" ? (
                            <UserNotes notes={userProfile?.notes} />
                        ) : (
                            <div className="text-neutral-700 italic">
                                No posts to display
                            </div>
                        )}
                    </div>
                </article>
            </main>
        </section>
    );
};

export default UserProfile;
