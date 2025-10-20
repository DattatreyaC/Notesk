import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Loader from "../Loader";

const OtpModal = ({ isOpen, onClose, onSubmit }) => {
    const { isAuthLoading } = useAuthStore();
    const [otp, setOtp] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!otp.trim()) return;
        onSubmit(otp);
        setOtp("");
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-neutral-300 text-black p-6 rounded shadow-lg w-120 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-900 hover:text-white text-2xl"
                >
                    ×
                </button>

                <h2 className="text-lg font-semibold mb-4 text-center ">
                    Verify OTP
                </h2>

                <div className="mb-3 text-center">
                    <p className="font-semibold">
                        OTP has been sent to your Email.
                    </p>
                    <p className="text-sm">Please check the spam folder too.</p>
                </div>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 text-center border rounded mb-4 focus:outline-none focus:ring-1 focus:ring-black"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-black/20 border border-black/50 hover:bg-black/50 transition-colors font-medium py-2 rounded"
                >
                    {isAuthLoading ? <Loader /> : "Verify OTP"}
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
