import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    const user = {
        starredPosts: [],
        tasks: [],
        _id: "687aa106b7b594093b35e784",
        firstname: "rahul",
        lastname: "das",
        username: "rad",
        password:
            "$2b$10$Bwt01a6qma6iTaoJgUx1suWqHPsaLXqdggRag8gZpdDdgTn9Qwm5K",
        requestsReceived: [],
        requestsSent: [],
        friends: ["687aa276b7b594093b35e78f"],
        notes: ["687b299dfb7149b12a05b5ac"],
        posts: [],
        createdAt: "2025-07-18T19:31:18.422Z",
        updatedAt: "2025-07-19T11:12:51.747Z",
        __v: 0,
    };

    return (
        <>
            <section className="bg w-full h-screen">
                <div className="h-full w-full">
                    <main className="border">
                        <div>Your notes</div>

                        <div>Your tasks</div>

                        <div>Your posts</div>

                        <div>Starred posts</div>
                    </main>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
