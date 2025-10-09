import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const usePostStore = create((set) => ({
    myPosts: [],
    postsLoading: false,

    fetchMyPosts: async () => {
        try {
            set({ postsLoading: true });
            const response = await axiosInstance.get("/posts/myPosts");
            if (response) {
                set({ myPosts: response.data });
            }
        } catch (error) {
            set({ myPosts: [] });
        } finally {
            set({ postsLoading: false });
        }
    },
}));

export default usePostStore;
