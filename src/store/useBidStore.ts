import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import { Bid } from "@/types/types"; // You should define this type

interface BidStore {
  bidData: Partial<Bid>;
  bids: Bid[];
  loading: boolean;
  setBidData: (data: Partial<Bid>) => void;
  updateBidField: <K extends keyof Bid>(key: K, value: Bid[K]) => void;
  resetBid: () => void;
  fetchBidsForTask: (taskId: string) => Promise<void>;
  submitBid: (formData: FormData) => Promise<Response>;
  updateBid: (id: string, formData: FormData) => Promise<Response>;
  deleteBid: (id: string) => Promise<void>;
}

export const useBidStore = create<BidStore>((set) => ({
  bidData: {},
  bids: [],
  loading: false,

  setBidData: (data) => set({ bidData: data }),

  updateBidField: (key, value) =>
    set((state) => ({
      bidData: {
        ...state.bidData,
        [key]: value,
      },
    })),

  resetBid: () => set({ bidData: {} }),

  fetchBidsForTask: async (taskId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/bids/task/${taskId}`);
      set({ bids: res.data });
    } catch (err: any) {
      console.error("Error fetching bids:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch bids");
    } finally {
      set({ loading: false });
    }
  },

  submitBid: async (formData) => {
    try {
      const res = await axiosInstance.post("/bids", formData);
      toast.success("Bid submitted successfully!");
      return res;
    } catch (err: any) {
      console.error("Error submitting bid:", err);
      toast.error(err?.response?.data?.message || "Failed to submit bid");
      return err;
    }
  },

  updateBid: async (id, formData) => {
    try {
      const res = await axiosInstance.patch(`/bids/${id}`, formData);
      toast.success("Bid updated successfully!");
      return res;
    } catch (err: any) {
      console.error("Error updating bid:", err);
      toast.error(err?.response?.data?.message || "Failed to update bid");
      return err;
    }
  },

  deleteBid: async (id) => {
    try {
      await axiosInstance.delete(`/bids/${id}`);
      toast.success("Bid deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting bid:", err);
      toast.error(err?.response?.data?.message || "Failed to delete bid");
    }
  },
}));
