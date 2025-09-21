import React, { useState } from "react";
import LoginComponent from "../components/auth-components/LoginComponent";
import RegisterComponent from "../components/auth-components/RegisterComponent";

const AuthPage = () => {
    const [choice, setChoice] = useState("login");

    const handleAuthMode = (mode) => {
        setChoice(mode);
    };

    return (
        <main className="w-full h-screen flex items-center translate-y-[35%] flex-col">
            {/* 2 tabs for register and login */}
            <div className="w-full max-w-xl border border-black/50 rounded p-5">
                <div className="flex gap-3 p-1">
                    <span
                        className={`w-full border-b-2 pb-1.5 ${
                            choice === "register"
                                ? "border-black"
                                : "border-black/30"
                        }`}
                    >
                        <button
                            className={`rounded border w-full cursor-pointer p-3 font-semibold ${
                                choice === "register"
                                    ? "bg-black text-white hover:text-white hover:bg-black"
                                    : "text-black/60 hover:text-black hover:bg-black/8"
                            }  duration-200`}
                            onClick={() => handleAuthMode("register")}
                        >
                            Register
                        </button>
                    </span>

                    <span
                        className={`w-full border-b-2 pb-1.5 ${
                            choice === "login"
                                ? "border-black "
                                : "border-black/30"
                        }`}
                    >
                        <button
                            className={`rounded border w-full cursor-pointer p-3 font-semibold ${
                                choice === "login"
                                    ? "bg-black text-white hover:text-white hover:bg-black"
                                    : "text-black/60 hover:text-black hover:bg-black/8"
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
        </main>
    );
};

export default AuthPage;
