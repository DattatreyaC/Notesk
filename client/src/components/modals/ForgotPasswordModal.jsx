import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Loader from "../Loader";

// take email and send the otp
const Step0 = ({ setStep }) => {
    const [email, setEmail] = useState("");

    const { isAuthLoading, requestOtp } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !email) {
            return;
        }

        if ((await requestOtp(email, "forgotPassword")) === true) {
            setStep((prev) => prev + 1);
        }
    };

    return (
        <>
            <h2 className="text-lg font-semibold mb-4 text-center ">
                Validate Email
            </h2>

            <div className="mb-3 text-center">
                <p className="font-semibold">Enter your Account Email</p>
                <p className="text-sm">An OTP will be sent to your mail.</p>
            </div>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-black/20 border border-black/50 hover:bg-black/50 transition-colors font-medium py-2 rounded"
            >
                {isAuthLoading ? <Loader /> : "Send Verification OTP"}
            </button>
        </>
    );
};

// verify the otp
const Step1 = ({ setStep }) => {
    const [otp, setOtp] = useState("");

    const { isAuthLoading, verifyOtp } = useAuthStore();

    const handleSubmit = async () => {
        if (!otp.trim()) return;

        if (await verifyOtp(otp)) {
            setOtp("");
            setStep((prev) => prev + 1);
        }
    };

    return (
        <>
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
        </>
    );
};

// reset password
const Step2 = ({ setStep, onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { isAuthLoading, resetPassword } = useAuthStore();

    const validateForm = () => {
        if (!password || !confirmPassword) {
            return false;
        }

        if (password != confirmPassword) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if ((await resetPassword(password)) === true) {
            onClose();
            setStep(0);
        }
    };

    return (
        <>
            <h2 className="text-lg font-semibold mb-4 text-center ">
                Reset Your Password
            </h2>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-black/20 border border-black/50 hover:bg-black/50 transition-colors font-medium py-2 rounded"
            >
                {isAuthLoading ? <Loader /> : "Verify OTP"}
            </button>
        </>
    );
};

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 `}
        >
            <div
                className="bg-neutral-300 text-black p-6 rounded shadow-lg w-120 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => {
                        onClose();
                        setStep(0);
                    }}
                    className="absolute top-2 right-3 text-gray-900 hover:text-white text-2xl"
                >
                    ×
                </button>

                {step === 0 ? (
                    <Step0 setStep={setStep} />
                ) : step === 1 ? (
                    <Step1 setStep={setStep} />
                ) : (
                    <Step2 setStep={setStep} onClose={onClose} />
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
