import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: false,
    isAuthLoading: false, //login || signup

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: () => {},

    register: () => {},

    logout: () => {},

    deleteAccount: () => {},
}));

export default useAuthStore;
