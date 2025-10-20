import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useDashboardStore from "../store/useDashboardStore";
import DashboardNoteCard from "../components/dashboard-components/dashboardNoteCard";
import DashboardTaskCard from "../components/dashboard-components/dashboardTaskCard";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardTaskCardSkeleton from "../components/dashboard-components/DashboardTaskCardSkeleton";
import DashboardNoteCardSkeleton from "../components/dashboard-components/DashboardNoteCardSkeleton";

const Dashboard = () => {
    const { user } = useAuthStore();
    const {
        fetchDashboardData,
        dashboardNotes,
        dashboardTasks,
        isFetchingData,
    } = useDashboardStore();

    useEffect(() => {
        document.title = "Dashboard";
        fetchDashboardData();
    }, []);

    return (
        <section className="bg w-full min-h-screen flex flex-col pl-12 p-3 place-items-center">
            {/* Page Title */}
            <h1 className="text-black font-bold text-4xl text-center mb-4">
                DASHBOARD
            </h1>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full auto-rows-fr w-full max-w-7xl">
                {/* Notes */}
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative bg-yellow-50">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Notes
                    </h2>

                    <div className="flex flex-col items-start text-gray-500 p-2 h-full ">
                        {isFetchingData && dashboardNotes.length === 0 ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <DashboardNoteCardSkeleton key={index} />
                            ))
                        ) : dashboardNotes.length === 0 ? (
                            <p className="w-full h-full text-center place-content-center">
                                Start writing notes to see them here.
                            </p>
                        ) : (
                            dashboardNotes.map((note) => {
                                return (
                                    <DashboardNoteCard
                                        key={note._id}
                                        note={note}
                                    />
                                );
                            })
                        )}
                    </div>

                    <div className="absolute bottom-0 right-0  flex items-center justify-center gap-2 p-1">
                        <Link
                            to={"/notes"}
                            className="bg-black hover:bg-slate-900 duration-200 text-white p-1.5 rounded cursor-pointer"
                        >
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>

                {/* Tasks */}
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative bg-neutral-300">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Tasks
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500 ">
                        {isFetchingData && dashboardTasks.length === 0 ? (
                            <div className="p-1 w-full h-full space-y-1">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <DashboardTaskCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : !isFetchingData && dashboardTasks?.length === 0 ? (
                            <p className="w-full h-full text-center place-content-center">
                                No tasks to display
                            </p>
                        ) : (
                            <div className="p-1 w-full h-full space-y-1">
                                {dashboardTasks.map((task) => {
                                    return (
                                        <DashboardTaskCard
                                            key={task._id}
                                            task={task}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-0 right-0  flex items-center justify-center gap-2 p-1">
                        <Link
                            to={"/tasks"}
                            className="bg-black hover:bg-slate-900 duration-200 text-white p-1.5 rounded cursor-pointer"
                        >
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>

                {/* Posts */}
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative">
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
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative">
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
