import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance.js";

const useNoteStore = create((set) => ({
    notes: [],
    isFetchingNotes: false,

    fetchNotes: async () => {
        try {
            set({ isFetchingNotes: true });

            const response = await axiosInstance.get("/note/mynotes");

            if (response) {
                set({ notes: response.data });
            }
        } catch (error) {
            set({ notes: [] });
        } finally {
            set({ isFetchingNotes: false });
        }
    },

    createNote: async () => {},

    editNote: async () => {},

    deleteNote: async () => {},

    pinNote: async () => {},
}));

export default useNoteStore;
