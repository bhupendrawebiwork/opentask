import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    const { authUser } = useAuthStore.getState();
    console.log("get users ---", authUser);
    try {
      const res = await axiosInstance.get("/user/all/" + authUser.id);
      set({
        users: res.data.map((elm) => ({
          _id: elm.id,
          name: elm.name,
          fullName: elm.name,
          email: elm.email,
          lastMessage: null,
          avater: elm.avater,
        })),
      });
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log("wee", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("error", error);

      // toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      const { socket, authUser } = useAuthStore.getState();
      const cleanMessage = {
        text: messageData.text,
        receiverId: selectedUser?._id,
        senderId: authUser.id,
      };
      socket.emit("sendMessage", cleanMessage);

      // set({ messages: [...messages, messageData] });
    } catch (error) {
      console.log("sssssa", error);

      // toast.error(error.message);
    }
  },

  subscribeToMessages: () => {
       console.log("newMessage --" );
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      console.log("newMessage --"  , newMessage);
      
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) {
        return;
      }

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) =>{ console.log("setSelectedUser", selectedUser);
   set({ selectedUser })},
}));
