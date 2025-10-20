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
        getProfileByUsername(username);
    }, []);

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 pr-1  overflow-y-auto relative overflow-x-hidden">
            <main className="w-full h-full flex items-center justify-center relative ">
                <Link
                    to={"/friends"}
                    className="absolute flex items-center gap-1 top-5 left-5 p-2 rounded-full text-sm"
                >
                    <ArrowLeft />
                    <span>Go Back</span>
                </Link>

                <article className="flex flex-col gap-2 w-full sm:w-lg md:w-xl">
                    <div className=" flex flex-col items-center gap-1.5 border-b">
                        <CircleUserRound size={80} strokeWidth={1} />

                        {friendsLoading ? (
                            <h1 className="bg-neutral-800 w-80 h-7 rounded-md animate-pulse "></h1>
                        ) : (
                            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center">{`${userProfile?.firstname} ${userProfile?.lastname}`}</h1>
                        )}
                    </div>

                    {friendsLoading ? (
                        <h1 className="bg-neutral-800 w-40 h-5 rounded-md animate-pulse "></h1>
                    ) : (
                        <h2 className="italic px-1 font-semibold">
                            {userProfile?.username}
                        </h2>
                    )}

                    {friendsLoading ? (
                        <h1 className="bg-neutral-800 w-50 h-5 rounded-md animate-pulse "></h1>
                    ) : (
                        <h2 className="px-1">{userProfile?.email}</h2>
                    )}

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
                            className={`border border-white/50 font-semibold cursor-pointer py-1 px-1.5 rounded duration-200 ${
                                activeTab === "Posts"
                                    ? "bg-white text-black"
                                    : "hover:bg-white/30 bg-black text-white"
                            }`}
                        >
                            Posts
                        </button>
                    </div>
                    {friendsLoading ? (
                        <div className="w-full sm:w-lg min-h-60 bg-neutral-400 border border-neutral-600 rounded-md p-1 overflow-auto flex items-center justify-center">
                            <span className="animate-spin">
                                <Loader />
                            </span>
                        </div>
                    ) : activeTab === "Notes" ? (
                        <UserNotes notes={userProfile?.notes} />
                    ) : (
                        <div className="w-full min-h-60 bg-neutral-400 border border-neutral-600 rounded-md p-1 overflow-auto flex items-center justify-center">
                            {/* <span className="animate-spin">
                                <Loader />
                            </span> */}
                        </div>
                    )}
                </article>
            </main>
        </section>
    );
};

export default UserProfile;
