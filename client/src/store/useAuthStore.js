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
            const email = formData.email;

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

            const payload = formData;

            const response = await axiosInstance.post(endpoint, payload);

            if (response.status === 200) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error sending OTP");
        } finally {
            set({ isAuthLoading: false });
        }
    },

    verifyOtp: async (otp) => {
        try {
            set({ isAuthLoading: true });
            const { otpAction, otpEmail } = get();

            let endpoint = "";
            let payload = { email: otpEmail, otp };

            switch (otpAction) {
                case "login":
                    endpoint = "/auth/login/verify-otp";
                    break;
                case "register":
                    endpoint = "/auth/register/verify-otp";
                    break;
                case "forgotPassword":
                    endpoint = "/auth/reset-password";
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
                toast.success(response.data.message);

                if (otpAction === "login" || otpAction === "register") {
                    set({ user: response.data.user });
                }
                set({ otpAction: null, otpEmail: null });

                return true;
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "OTP verification failed",
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
}));

export default useAuthStore;
