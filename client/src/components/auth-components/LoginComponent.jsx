import React from "react";

const LoginComponent = () => {
    return (
        <>
            <form className="p-3 space-y-2">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border focus:outline-none rounded"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border focus:outline-none rounded"
                    />
                </div>
            </form>
        </>
    );
};

export default LoginComponent;
