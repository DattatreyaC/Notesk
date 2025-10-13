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

                toast.success("Task created");
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
                toast.success("Task updated");
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
                toast.success("Task deleted");
            } else {
                // ❌ If server doesn’t confirm deletion, revert
                set({ tasks: previousTasks });
                toast.error("Failed to delete task");
            }
        } catch (error) {
            // ❌ Revert state if error occurs
            set({ tasks: get().tasksBackup || get().tasks });
            toast.error("Failed to delete task");
        } finally {
            set({ isTasksLoading: false });
        }
    },
}));

export default useTaskStore;
