// stores/userStore.ts
import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isVerified?: boolean;
  rating?: number;
  position?: string;
  lang?: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;

  fetchUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  changePassword: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/user");
      set({ user: res.data });
    } catch (err: any) {
      console.error("Fetch user error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch user");
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (data) => {
    try {
      const res = await axiosInstance.patch("/user", data);
      toast.success("Profile updated successfully");
      set({ user: res.data });
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  },

  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axiosInstance.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Avatar uploaded successfully");
      set((state) => ({ user: { ...state.user, ...res.data } }));
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      toast.error(err?.response?.data?.message || "Upload failed");
    }
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    try {
      const res = await axiosInstance.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully");
    } catch (err: any) {
      console.error("Change password error:", err);
      toast.error(err?.response?.data?.message || "Change password failed");
    }
  },
}));
