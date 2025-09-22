import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: false,
    isAuthLoading: false, //login || signup

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });

            const response = await axiosInstance.get("/auth/profile");
            if (response.status === 200) {
                set({ user: response.data });
            } else {
                set({ user: null });
            }
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (payload) => {
        try {
            set({ isAuthLoading: true });

            const response = await axiosInstance.post("/auth/login", payload, {
                withCredentials: true,
            });
            if (response) {
                set({ user: response.data });
            }
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isAuthLoading: false });
        }
    },

    register: async (payload) => {
        try {
            set({ isAuthLoading: true });

            const response = await axiosInstance.post(
                "/auth/register",
                payload,
                { withCredentials: true },
            );
            if (response) {
                set({ user: response.data });
            }
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isAuthLoading: false });
        }
    },

    logout: () => {},

    deleteAccount: () => {},
}));

export default useAuthStore;
