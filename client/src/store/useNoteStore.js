import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

const useNoteStore = create((set) => ({
    notes: [],
    isNotesLoading: false,

    fetchNotes: async () => {
        try {
            set({ isNotesLoading: true });

            const response = await axiosInstance.get("/note/mynotes");

            if (response) {
                set({ notes: response.data });
            }
        } catch (error) {
            set({ notes: [] });
        } finally {
            set({ isNotesLoading: false });
        }
    },

    createNote: async (payload) => {
        try {
            set({ isNotesLoading: true });

            const response = await axiosInstance.post("/note/create", payload);
            if (response) {
                toast.success("Noted");
            }
        } catch (error) {
        } finally {
            set({ isNotesLoading: false });
        }
    },

    editNote: async () => {},

    deleteNote: async (id) => {
        try {
            set({ isNotesLoading: true });

            const response = await axiosInstance.delete(`/note/delete/${id}`);
            if (response) {
                toast.success("Deleted");
            }
        } catch (error) {
        } finally {
            set({ isNotesLoading: false });
        }
    },

    pinNote: async () => {},
}));

export default useNoteStore;
