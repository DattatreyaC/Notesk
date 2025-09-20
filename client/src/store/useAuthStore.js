import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: false,

    checkAuth: () => {},
}));
