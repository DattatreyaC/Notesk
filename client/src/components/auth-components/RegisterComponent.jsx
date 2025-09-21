import React, { useState } from "react";

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form className="p-3 space-y-2" onSubmit={handleSubmit}>
                <div className="flex w-full gap-3">
                    <input
                        type="text"
                        placeholder="FirstName"
                        className="w-full p-2 border focus:outline-none rounded"
                    />
                    <input
                        type="text"
                        placeholder="LastName"
                        className="w-full p-2 border focus:outline-none rounded"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border focus:outline-none rounded"
                    />
                </div>

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

                <div className="pt-5 w-full ">
                    <button
                        type="submit"
                        className="p-2 border w-full cursor-pointer rounded relative z-10 overflow-hidden transition-colors duration-200 group z-10"
                    >
                        <span className="group-hover:text-white z-10">
                            Create an account
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-l from-black to-black/80 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-200 z-0 "></span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default RegisterComponent;
