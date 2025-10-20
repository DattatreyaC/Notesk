import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import OtpModal from "../modals/OtpModal.jsx";

const RegisterComponent = () => {
    const { register, verifyOtp, requestOtp, isAuthLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showOtpModal, setShowOtpModal] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstname.trim())
            newErrors.firstname = "First name is required.";
        if (!formData.lastname.trim())
            newErrors.lastname = "Last name is required.";
        if (!formData.username.trim())
            newErrors.username = "Username is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid.";
        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (await requestOtp(formData, "register")) setShowOtpModal(true);
    };

    const handleOtpSubmit = async (otp) => {
        await verifyOtp(otp);
        setShowOtpModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <form className="p-3 space-y-3" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-neutral-300"
                    />
                    {errors.firstname && (
                        <p className="text-xs text-red-500">
                            {errors.firstname}
                        </p>
                    )}

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-neutral-300"
                    />
                    {errors.lastname && (
                        <p className="text-xs text-red-500">
                            {errors.lastname}
                        </p>
                    )}
                </div>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-neutral-300"
                />
                {errors.username && (
                    <p className="text-xs text-red-500">{errors.username}</p>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-neutral-300"
                />
                {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-neutral-300"
                />
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                )}

                <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full p-2.5 mt-4 border rounded font-semibold bg-black/40 hover:bg-black hover:text-white duration-200"
                >
                    {isAuthLoading ? "Loading..." : "Create Account"}
                </button>
            </form>

            <OtpModal
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                onSubmit={handleOtpSubmit}
            />
        </>
    );
};

export default RegisterComponent;
