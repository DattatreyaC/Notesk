import React, { useState } from "react";
import LoginComponent from "../components/auth-components/LoginComponent";
import RegisterComponent from "../components/auth-components/RegisterComponent";

const AuthPage = () => {
    const [choice, setChoice] = useState("login");

    return (
        <main className="w-full h-screen flex items-center justify-center flex-col">
            {/* 2 tabs for register and login */}

            <div className="flex border gap-3 p-1">
                <button className="rounded">Register</button>
                <button>Login</button>
            </div>
            <div>
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
