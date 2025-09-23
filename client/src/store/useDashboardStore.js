import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useDashboardStore = create((set) => ({
    dashboardNotes: [],
    dashboardTasks: [],
    dashboardPosts: [],
    dashboardStarredPosts: [],
    isFetchingData: false,

    fetchDashboardData: async () => {
        try {
            set({ isFetchingData: true });

            const response = await axiosInstance.get("/dashboard/data");

            if (response) {
                set({ dashboardNotes: response.data.notes });
                set({ dashboardPosts: response.data.posts });
                set({ dashboardTasks: response.data.tasks });
                set({ dashboardStarredPosts: response.data.starredPosts });
            }
        } catch (error) {
            set({ dashboardNotes: [] });
            set({ dashboardTasks: [] });
            set({ dashboardPosts: [] });
            set({ dashboardStarredPosts: [] });

            toast.error("Unable to load data", {
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
            set({ isFetchingData: false });
        }
    },
}));

export default useDashboardStore;
