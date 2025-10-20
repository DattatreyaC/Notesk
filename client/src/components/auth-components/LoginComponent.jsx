import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Loader from "../Loader";
import OtpModal from "../modals/OtpModal.jsx";

const LoginComponent = () => {
    const { login, verifyOtp, requestOtp, isAuthLoading } = useAuthStore();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showOtpModal, setShowOtpModal] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email address is invalid.";

        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (await requestOtp(formData, "login")) setShowOtpModal(true);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // if()
    };

    const handleOtpSubmit = async (otp) => {
        const verified = await verifyOtp(otp);
        if (verified) setShowOtpModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <form className="p-3 space-y-2.5 " onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-neutral-300"
                />
                {errors.email && (
                    <p className="pt-1 text-xs text-red-500">{errors.email}</p>
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
                    <p className="pt-1 text-xs text-red-500">
                        {errors.password}
                    </p>
                )}

                <div>
                    <p
                        onClick={handlePasswordReset}
                        className="underline mt-1 text-[15px] cursor-pointer text-black/70 hover:text-black duration-100"
                    >
                        Forgot Password
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full p-2.5 mt-4 border rounded font-semibold bg-black/40 hover:bg-black hover:text-white duration-200"
                >
                    {isAuthLoading ? <Loader /> : "Login"}
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

export default LoginComponent;
