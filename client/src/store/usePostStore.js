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

            toast.error("Unable to load posts", {
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
        } finally {
            set({ postsLoading: false });
        }
    },
}));

export default usePostStore;
