import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <header></header>
            <main className="flex flex-col gap-5 items-start justify-center border h-screen w-full pl-3">
                <div>
                    <h1 className="text-4xl font-bold">
                        Manage your notes and tasks,
                    </h1>
                    <h2 className="text-3xl">
                        all in one place; with your friends!
                    </h2>
                </div>

                <p className="font-light max-w-100">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa, expedita!
                </p>

                <div className="flex gap-3">
                    <div className="w-max h-max group relative">
                        <Link
                            to={"/signup"}
                            className="border border-black block text-lg bg-black text-white hover:bg-white hover:text-black py-1 px-3"
                        >
                            Sign Up
                        </Link>
                        <div className="bg-black w-full h-full absolute left-0 top-0 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-150 z-[-1]"></div>
                    </div>

                    <div className="w-max h-max group relative">
                        <Link
                            to={"/login"}
                            className="border border-black block text-lg bg-black/50 text-white hover:bg-white hover:text-black py-1 px-3"
                        >
                            Login
                        </Link>
                        <div className="bg-black w-full h-full absolute left-0 top-0 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-150 z-[-1]"></div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default LandingPage;
