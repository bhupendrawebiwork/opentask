import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import { Task } from "@/types/types";

interface TaskStore {
  taskData: Partial<Task>;
  tasks: Task[];
  mytasks: Task[];
  loading: boolean;

  setTaskData: (data: Partial<Task>) => void;
  updateTaskField: <K extends keyof Task>(key: K, value: Task[K]) => void;
  resetTask: () => void;
  fetchTasks: () => Promise<void>;
  fetchMyTasks: () => Promise<void>;
  submitTask: (formData: FormData) => Promise<Response>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  taskData: {},
  tasks: [],
  mytasks: [],
  loading: false,

  setTaskData: (data) => set({ taskData: data }),

  updateTaskField: (key, value) =>
    set((state) => ({
      taskData: {
        ...state.taskData,
        [key]: value,
      },
    })),

  resetTask: () => set({ taskData: {} }),

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/tasks/public");
      set({ tasks: res.data.data });
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Failed to load tasks"
      );
    } finally {
      set({ loading: false });
    }
  },

  fetchMyTasks: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/tasks");
      set({ mytasks: res.data.data });
    } catch (err: any) {
      console.error("Error fetching my tasks:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Failed to load tasks"
      );
    } finally {
      set({ loading: false });
    }
  },

  submitTask: async (formData: FormData) => {
    try {
      const res = await axiosInstance.post("/tasks", formData);

      if (!res || !res.data) {
        throw new Error("Invalid response");
      }

      toast.success("Task posted successfully!");
      return res;
    } catch (err: any) {
      console.error("Error submitting task:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Failed to post task"
      );
      return err;
    }
  },
}));
