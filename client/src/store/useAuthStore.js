import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
    user: null,
    isCheckingAuth: false,
    isAuthLoading: false,
    otpAction: null,
    otpEmail: null,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axiosInstance.get("/auth/profile");
            set({ user: response.status === 200 ? response.data : null });
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    requestOtp: async (formData, action) => {
        try {
            let email;

            if (action === "forgotPassword") {
                email = formData;
            } else {
                email = formData.email;
            }

            set({ isAuthLoading: true });
            set({ otpAction: action, otpEmail: email });

            let endpoint = "";
            switch (action) {
                case "login":
                    endpoint = "/auth/login";
                    break;
                case "register":
                    endpoint = "/auth/register";
                    break;
                case "forgotPassword":
                    endpoint = "/auth/forgot-password";
                    break;
                case "delete":
                    endpoint = "/auth/delete";
                    break;
                default:
                    throw new Error("Invalid OTP action");
            }

            let payload;

            if (action === "forgotPassword") {
                payload = {
                    email,
                };
            } else {
                payload = formData;
            }

            const response = await axiosInstance.post(endpoint, payload);

            if (response.status === 200) {
                toast.success(response.data.message, {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "white",
                        background: "rgba(0,130,0,0.8)",
                    },
                    iconTheme: {
                        primary: "white",
                        secondary: "green",
                    },
                });

                return true;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error sending OTP", {
                style: {
                    border: "1px solid red",
                    padding: "12px",
                    color: "white",
                    background: "rgba(100,0,0,0.8)",
                },
                iconTheme: {
                    primary: "white",
                    secondary: "red",
                },
            });

            return false;
        } finally {
            set({ isAuthLoading: false });
        }
    },

    verifyOtp: async (otp) => {
        try {
            set({ isAuthLoading: true });
            const { otpAction, otpEmail } = get();

            let endpoint = "";

            let payload = {
                email: otpEmail,
                otp,
            };

            switch (otpAction) {
                case "login":
                    endpoint = "/auth/login/verify-otp";
                    break;
                case "register":
                    endpoint = "/auth/register/verify-otp";
                    break;
                case "forgotPassword":
                    endpoint = "/auth/resetPassword/verify-otp";
                    break;
                case "delete":
                    endpoint = "/auth/delete";
                    break;
                default:
                    throw new Error("Invalid OTP action");
            }

            const response = await axiosInstance.post(endpoint, payload, {
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success(response.data.message, {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "white",
                        background: "rgba(0,130,0,0.8)",
                    },
                    iconTheme: {
                        primary: "white",
                        secondary: "green",
                    },
                });

                if (otpAction === "login" || otpAction === "register") {
                    set({ user: response.data.user });
                }

                set({ otpAction: null });

                if (otpAction != "forgotPassword") {
                    set({ otpEmail: null });
                }

                return true;
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "OTP verification failed",
                {
                    style: {
                        border: "1px solid red",
                        padding: "12px",
                        color: "white",
                        background: "rgba(100,0,0,0.8)",
                    },
                    iconTheme: {
                        primary: "white",
                        secondary: "red",
                    },
                },
            );

            return false;
        } finally {
            set({ isAuthLoading: false });
        }
    },

    logout: async () => {
        try {
            set({ isAuthLoading: true });
            const response = await axiosInstance.post("/auth/logout");
            if (response.status === 200) set({ user: null });
        } catch (error) {
            toast.error("Server error. Please try again");
        } finally {
            set({ isAuthLoading: false });
        }
    },

    resetPassword: async (password) => {
        try {
            set({ isAuthLoading: true });

            const { otpEmail } = get();

            const payload = {
                email: otpEmail,
                password,
            };

            const response = await axiosInstance.post(
                "/auth/reset-password",
                payload,
            );

            if (response.status === 200) {
                toast.success(
                    response.data.message || "Password reset successfully",
                );

                set({ otpEmail: null });

                return true;
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong",
            );
        } finally {
            set({ isAuthLoading: false });
        }
    },
}));

export default useAuthStore;
