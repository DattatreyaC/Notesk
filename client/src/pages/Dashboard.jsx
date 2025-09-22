import React from "react";

const Dashboard = () => {
    const user = {
        starredPosts: [],
        tasks: [],
        _id: "687aa106b7b594093b35e784",
        firstname: "rahul",
        lastname: "das",
        username: "rad",
        requestsReceived: [],
        requestsSent: [],
        friends: ["687aa276b7b594093b35e78f"],
        notes: ["687b299dfb7149b12a05b5ac"],
        posts: [],
    };

    return (
        <section className="bg w-full min-h-screen flex flex-col pl-12 p-3">
            {/* Page Title */}
            <h1 className="text-black font-bold text-4xl text-center mb-4">
                DASHBOARD
            </h1>

            {/* Card Grid - fills remaining space */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notes */}
                <div className="border rounded-lg shadow-md flex flex-col h-full overflow-hidden">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Notes ({user.notes.length})
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        {user.notes.length === 0
                            ? "Start writing notes to see them here..."
                            : ""}
                    </div>
                </div>

                {/* Tasks */}
                <div className="border rounded-lg shadow-md flex flex-col h-full overflow-hidden">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Tasks ({user.tasks.length})
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        {user.tasks.length === 0
                            ? "Add a few tasks for the day..."
                            : ""}
                    </div>
                </div>

                {/* Posts */}
                <div className="border rounded-lg shadow-md flex flex-col h-full overflow-hidden">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Posts ({user.posts.length})
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        {user.posts.length === 0
                            ? "You have not posted yet."
                            : ""}
                    </div>
                </div>

                {/* Starred Posts */}
                <div className="border rounded-lg shadow-md flex flex-col h-full overflow-hidden">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Starred Posts ({user.starredPosts.length})
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        {user.starredPosts.length === 0
                            ? "Save posts by starring them."
                            : ""}
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Dashboard;
