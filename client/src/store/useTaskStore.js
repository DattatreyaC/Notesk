import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useTaskStore = create((set, get) => ({
    tasks: [],
    isTasksLoading: false,

    fetchTasks: async () => {
        try {
            set({ isTasksLoading: true });

            const response = await axiosInstance.get("/tasks");
            if (response.status === 200) {
                set({ tasks: response.data });
            }
        } catch (error) {
            set({ tasks: [] });

            toast.error("Unable to load tasks", {
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
            set({ isTasksLoading: false });
        }
    },

    createTask: async (payload) => {
        try {
            set({ isTasksLoading: true });

            const response = await axiosInstance.post("/tasks/create", payload);

            if (response.status === 201) {
                const newTask = response.data;

                set((state) => ({
                    tasks: [newTask, ...state.tasks],
                }));

                toast.success("Task Created", {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "black",
                        background: "rgba(0,130,0,0.7)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });
            } else {
                toast.error("Failed to create task");
            }
        } catch (error) {
            toast.error("Failed to add task");
        } finally {
            set({ isTasksLoading: false });
        }
    },

    updateTask: async (id, payload) => {
        const previousTasks = get().tasks;

        try {
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? { ...task, ...payload } : task,
                ),
            }));

            const response = await axiosInstance.put(
                `/tasks/update/${id}`,
                payload,
            );

            if (response.status === 200) {
                toast.success("Task updated", {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "black",
                        background: "rgba(0,130,0,0.7",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });
            } else {
                set({ tasks: previousTasks });
                toast.error("Failed to update task");
            }
        } catch (error) {
            set({ tasks: previousTasks });
            toast.error("Failed to update task");
        } finally {
            set({ isTasksLoading: false });
        }
    },

    deleteTask: async (id) => {
        try {
            // ✅ Get the current list of tasks
            const previousTasks = get().tasks;

            // ✅ Optimistically remove the task from state
            set({
                tasks: previousTasks.filter((task) => task._id !== id),
                isTasksLoading: true,
            });

            // ✅ Make API request
            const response = await axiosInstance.delete(`/tasks/delete/${id}`);

            if (response.status === 200) {
                toast.success("Task Deleted", {
                    style: {
                        border: "1px solid green",
                        padding: "12px",
                        color: "black",
                        background: "rgba(0,130,0,0.7)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                });
            } else {
                set({ tasks: previousTasks });

                toast.error("Failed to delete task", {
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
            }
        } catch (error) {
            set({ tasks: get().previousTasks || get().tasks });

            toast.error("Failed to delete task", {
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
            set({ isTasksLoading: false });
        }
    },
}));

export default useTaskStore;
