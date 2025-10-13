import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useDashboardStore from "../store/useDashboardStore";
import DashboardNoteCard from "../components/dashboard-components/dashboardNoteCard";
import DashboardTaskCard from "../components/dashboard-components/dashboardTaskCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useAuthStore();
    const { fetchDashboardData, dashboardNotes, dashboardTasks } =
        useDashboardStore();

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

            {/* Card Grid - fills remaining space */}
            <main className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full auto-rows-fr w-full max-w-7xl">
                {/* Notes */}
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative bg-yellow-50">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Notes ({user.notes.length})
                    </h2>
                    <div className="flex flex-col items-start text-gray-500 p-2 ">
                        {dashboardNotes === 0
                            ? "Start writing notes to see them here..."
                            : dashboardNotes.map((note) => {
                                  return (
                                      <DashboardNoteCard
                                          key={note._id}
                                          note={note}
                                      />
                                  );
                              })}
                    </div>

                    <div className="absolute bottom-0 right-0  flex items-center justify-center gap-2 p-1">
                        {user.notes.length > 3 && (
                            <Link
                                to={"/notes"}
                                className="bg-black hover:bg-slate-900 duration-200 text-white p-1.5 rounded cursor-pointer"
                            >
                                View More
                            </Link>
                        )}

                        <button className="border p-1 bg-black rounded">
                            <Plus className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Tasks */}
                <div className="border rounded shadow-md flex flex-col  overflow-x-hidden overflow-y-auto relative">
                    <h2 className="bg-black text-white text-xl text-center p-2 font-semibold">
                        Tasks ({user.tasks.length})
                    </h2>
                    <div className="flex-1 flex items-center justify-center text-gray-500 ">
                        {user.tasks.length === 0 ? (
                            <p className="w-full h-full text-center">
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
                        {user.tasks.length > 3 && (
                            <Link
                                to={"/tasks"}
                                className="bg-black hover:bg-slate-900 duration-200 text-white p-1.5 rounded cursor-pointer"
                            >
                                View More
                            </Link>
                        )}

                        <button className="border p-1 bg-black rounded">
                            <Plus className="text-white" />
                        </button>
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
