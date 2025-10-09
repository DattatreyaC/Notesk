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
            if (response.status === 201) {
                toast.success("Noted", {
                    style: {
                        padding: "10px",
                        color: "black",
                        background: "green",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });

                set((state) => ({
                    notes: [response.data, ...state.notes], // 👈 add new note directly
                }));
            }
        } catch (error) {
            set({ isNotesLoading: false });
        } finally {
            set({ isNotesLoading: false });
        }
    },

    editNote: async (id, payload) => {
        try {
            set({ isNotesLoading: true });

            const response = await axiosInstance.put(
                `/note/edit/${id}`,
                payload,
            );

            if (response.status === 200) {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note._id === id ? response.data : note,
                    ),
                }));

                toast.success("Note Edited", {
                    style: {
                        padding: "10px",
                        color: "black",
                        background: "green",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });
            }
        } catch (error) {
            set({ isNotesLoading: false });
        } finally {
            set({ isNotesLoading: false });
        }
    },

    deleteNote: async (id) => {
        try {
            set({ isNotesLoading: true });

            const response = await axiosInstance.delete(`/note/delete/${id}`);

            if (response.status === 200) {
                toast.success("Note Deleted", {
                    style: {
                        border: "1px solid green",
                        padding: "10px",
                        color: "black",
                        background: "green",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });

                set((state) => ({
                    notes: state.notes.filter((note) => note._id !== id), // 👈 remove locally
                }));
            }
        } catch (error) {
            set({ isNotesLoading: false });
        } finally {
            set({ isNotesLoading: false });
        }
    },

    pinNote: async (id) => {
        try {
            set({ isNotesLoading: true });
            const response = await axiosInstance.post(`/note/pin/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note._id === id ? response.data : note,
                    ),
                }));
            }
        } catch (error) {
            console.error("Error pinning note:", error);
        } finally {
            set({ isNotesLoading: false });
        }
    },

    unpinNote: async (id) => {
        try {
            set({ isNotesLoading: true });
            const response = await axiosInstance.post(`/note/unpin/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note._id === id ? response.data : note,
                    ),
                }));
            }
        } catch (error) {
            console.error("Error unpinning note:", error);
        } finally {
            set({ isNotesLoading: false });
        }
    },
}));

export default useNoteStore;
