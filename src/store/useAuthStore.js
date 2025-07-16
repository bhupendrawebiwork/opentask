import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { base } from "@/config/constent";

const BASE_URL = `http://localhost:3001`;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(localStorage.getItem("user")) : null;
    if (userData) {
      set({ authUser: userData });
      set({ isCheckingAuth: false });
      get().connectSocket();
    } else {
      set({ authUser: null });
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
      get().connectSocket();
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      get().connectSocket();
      return res;
    } catch (error) {
      console.log("error -- ", error);

      toast.error(
        error.response.data.message || error?.message || "something went wrong"
      );
      return error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      // await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      get().disconnectSocket();
      window.location.href = "/";
    } catch (error) {
      toast.error("something went wrong");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
      auth: {
        ngrokSkipBrowserWarning: "true",
      },
      transports: ["websocket"],
    });

    socket.connect();
    socket.emit("joinChat", authUser.id);
    set({ socket: socket });

    socket.on("activeUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
