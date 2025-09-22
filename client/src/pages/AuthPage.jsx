import React, { useState } from "react";
import LoginComponent from "../components/auth-components/LoginComponent";
import RegisterComponent from "../components/auth-components/RegisterComponent";

const AuthPage = () => {
    const [choice, setChoice] = useState("register");

    const handleAuthMode = (mode) => {
        setChoice(mode);
    };

    return (
        <main className="w-full h-screen flex items-center justify-center flex-col bg">
            <h1 className="text-4xl font-bold">Notesk</h1>
            <div className="w-full max-w-xl h-[450px] p-1">
                {/* 2 tabs for register and login */}
                <div className="w-full max-w-xl border border-black/50 rounded p-0 md:p-5 overflow-hidden relative">
                    <div className="flex gap-0 p-1 mb-2">
                        <span
                            className={`w-full border-b-3 pb-2 ${
                                choice === "register"
                                    ? "border-black"
                                    : "border-black/30"
                            }`}
                        >
                            <button
                                className={` border w-full cursor-pointer p-3 font-semibold ${
                                    choice === "register"
                                        ? "bg-black text-white hover:text-white hover:bg-black border-black"
                                        : "text-black/60 hover:text-black hover:bg-black/8 border-black/50 hover:border-black"
                                }  duration-200`}
                                onClick={() => handleAuthMode("register")}
                            >
                                Register
                            </button>
                        </span>

                        <span
                            className={`w-full border-b-3 pb-1.5 ${
                                choice === "login"
                                    ? "border-black "
                                    : "border-black/30"
                            }`}
                        >
                            <button
                                className={` border w-full cursor-pointer p-3 font-semibold ${
                                    choice === "login"
                                        ? "bg-black text-white hover:text-white hover:bg-black border-black"
                                        : "text-black/60 hover:text-black hover:bg-black/8 border-black/50 hover:border-black"
                                }  duration-200`}
                                onClick={() => handleAuthMode("login")}
                            >
                                Login
                            </button>
                        </span>
                    </div>

                    {/* form */}
                    {choice === "login" ? (
                        <LoginComponent />
                    ) : (
                        <RegisterComponent />
                    )}
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
