import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LandingPage = () => {
    const { user } = useAuthStore();

    return (
        <main className="bg flex h-screen w-full bg-white/10">
            {/* Left Side - Text Content */}
            <section className="flex flex-col gap-6 items-start justify-center px-20 w-1/2">
                <div>
                    <h1 className="text-5xl font-bold">
                        Manage your notes & tasks
                    </h1>
                    <h2 className="text-2xl text-gray-700 mt-2">
                        All in one place, with your friends
                    </h2>
                </div>

                <p className="font-light max-w-md text-gray-600 leading-relaxed">
                    Stay productive and connected. Organize your notes, track
                    tasks, and collaborate effortlessly—all in one simple app.
                </p>

                <div className="flex gap-4 mt-4">
                    {/* Sign Up */}
                    <div className="w-max h-max group relative">
                        <Link
                            to="/auth"
                            className="relative block text-lg border-2  border-black bg-black text-white py-2 px-5 z-10 overflow-hidden transition-colors duration-200 rounded"
                        >
                            <span className="relative z-10 group-hover:text-black duration-200">
                                {user ? "Go to Dashboard" : "Get Started"}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-200 z-0 "></span>
                        </Link>
                    </div>

                    {/* Login */}
                    {!user && (
                        <div className="w-max h-max group relative">
                            <Link
                                to="/auth"
                                className="relative block text-lg border-2 border-black bg-white text-black py-2 px-5 z-10 overflow-hidden transition-colors duration-200 rounded"
                            >
                                <span className="relative z-10 group-hover:text-white duration-200">
                                    Login
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-l from-black to-black/80 translate-x-full group-hover:translate-x-0 transition-transform duration-200 z-0 "></span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Right Side - Visual Mockup */}
            <section className="flex items-center justify-center w-1/2 relative">
                <div className="bg-white shadow-xl rounded-xl p-6 w-96">
                    <h3 className="font-bold text-lg mb-3">Today’s Tasks</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center justify-between border rounded-md px-3 py-2">
                            <span>Finish project proposal</span>
                            <span className="text-green-600 font-medium">
                                ✓
                            </span>
                        </li>
                        <li className="flex items-center justify-between border rounded-md px-3 py-2">
                            <span>Plan meeting with team</span>
                            <span className="text-gray-400">⏳</span>
                        </li>
                        <li className="flex items-center justify-between border rounded-md px-3 py-2">
                            <span>Review shared notes</span>
                            <span className="text-red-500">•</span>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
