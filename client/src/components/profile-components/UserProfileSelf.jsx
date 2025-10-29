import React, { useRef, useState } from "react";
import { CircleUserRound, Pencil } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const UserProfileSelf = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState("Summary");

    const [preview, setPreview] = useState(user.profilePicture?.url || null);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            // TODO: Upload to server (placeholder for now)
            console.log("Selected file:", file);
        }
    };

    if (!user) return null;

    const fullName = `${user.firstname} ${user.lastname}`;

    return (
        <section className="bg w-full h-screen flex flex-col pl-14 pr-1 overflow-y-auto relative overflow-x-hidden z-30 py-5">
            <main className="w-full h-full flex items-center justify-center relative">
                <article className="flex flex-col gap-4 w-full sm:w-lg md:w-xl max-w-3xl mx-auto text-black ">
                    {/* Image and name */}
                    <div className="flex flex-col gap-1 border-b pb-2">
                        {/* Profile Picture */}
                        <div className="place-items-center ">
                            <div className="relative group w-24 h-24 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 flex items-center justify-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt={fullName}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-neutral-500 text-sm">
                                        No Image
                                    </span>
                                )}

                                {/* Overlay on hover */}
                                <div
                                    onClick={handleImageClick}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                                >
                                    <Pencil className="text-white" size={20} />
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="">
                            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] text-center font-semibold">
                                {fullName}
                            </h1>
                        </div>
                    </div>

                    {/* USER INFO */}
                    <div className="px-2 space-y-1">
                        <h2 className="font-bold text-black">
                            Username :{" "}
                            <span className="text-neutral-600 font-medium">
                                @{user.username}
                            </span>
                        </h2>
                        <p className="font-bold text-black">
                            Email :{" "}
                            <span className="text-neutral-600 font-medium">
                                {user.email}
                            </span>
                        </p>
                    </div>

                    <div className="">
                        {/* tab buttons */}
                        <div className="flex w-full gap-1 items-center justify-start border-b border-neutral-600 bg-neutral-900 rounded-t-lg pt-1 px-1 ">
                            {["Summary", "Account"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-4 py-2 text-sm transition-all duration-200 rounded-t-md border border-b-0 border-neutral-800/30 
                                        ${
                                            activeTab === tab
                                                ? "bg-white text-black border-b-0 shadow-inner font-semibold"
                                                : "text-white/70 bg-neutral-500/30 hover:bg-neutral-400/50 font-medium"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TABS */}
                        <div className="bg-neutral-400/70 border border-neutral-600 border-t-0 rounded-b-lg shadow-lg shadow-black/30 p-4">
                            {/* SUMMARY TAB */}
                            {activeTab === "Summary" && (
                                <div className="text-sm text-neutral-300 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                    {[
                                        {
                                            title: "Notes",
                                            count: user.notes?.length,
                                        },
                                        {
                                            title: "Tasks",
                                            count: user.tasks?.length,
                                        },
                                        {
                                            title: "Posts",
                                            count: user.posts?.length,
                                        },
                                        {
                                            title: "Friends",
                                            count: user.friends?.length,
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="bg-neutral-800/40 border border-neutral-700/80 rounded-lg flex flex-col items-center justify-center py-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]"
                                        >
                                            <span className="text-2xl font-semibold text-white">
                                                {item.count ?? 0}
                                            </span>
                                            <p className="text-black text-sm mt-1">
                                                {item.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ACCOUNT TAB */}
                            {activeTab === "Account" && (
                                <div className="text-neutral-800 text-sm space-y-2 mt-3">
                                    <p>
                                        <span className="text-neutral-900 font-semibold">
                                            Email Verified:
                                        </span>{" "}
                                        {user.isEmailVerified ? "Yes" : "No"}
                                    </p>
                                    <p>
                                        <span className="text-neutral-900 font-semibold">
                                            Joined:
                                        </span>{" "}
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString()}
                                    </p>

                                    <div className="pt-3">
                                        <button
                                            onClick={() => {}}
                                            className="border border-red-600/60 text-red-500 hover:bg-red-600/10 transition-all duration-200 rounded-md px-4 py-1.5 text-sm font-semibold"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </main>
        </section>
    );
};

export default UserProfileSelf;
