import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Loader from "../Loader";

const LoginComponent = () => {
    const { login, isAuthLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            // Simple regex for email format
            newErrors.email = "Email address is invalid.";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            login(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <form className="p-3 space-y-2.5" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && (
                        <p className="pt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && (
                        <p className="pt-1 text-xs text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="w-full h-fit pt-5">
                    <button
                        type="submit"
                        disabled={isAuthLoading}
                        className="group relative z-0 w-full cursor-pointer overflow-hidden rounded border-2 hover:border-black/60 p-2.5 transition-colors duration-200"
                    >
                        <div className="relative z-10 text-black font-semibold transition-colors duration-300 group-hover:text-white flex items-center justify-center gap-1">
                            {isAuthLoading
                                ? "Logging in"
                                : "Login to your account"}

                            {isAuthLoading && (
                                <div className=" h-fit">
                                    <Loader />
                                </div>
                            )}
                        </div>
                        <span className="absolute inset-0 z-0 -translate-x-full transform bg-gradient-to-r from-black via-black to-transparent transition-transform duration-200 group-hover:translate-x-0"></span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginComponent;
