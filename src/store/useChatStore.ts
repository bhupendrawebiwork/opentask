import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { POSTER } from "@/config/constent";
import { Message, Chat } from "@/types/types";

export type createChatPayload = {
  bidId: string;
  taskId: string;
  taskerId: string;
  posterId: string;
};

type ChatStoreState = {
  messages: Message[];
  chats: Chat[];
  selectedChat: Chat | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getChats: () => Promise<void>;
  getMessages: (chatId: string) => Promise<void>;
  sendMessage: (messageData: { text: string }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedChat: (chat: Chat | null) => void;
  createChat: (chat: createChatPayload) => Promise<void>;
};

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  chats: [],
  selectedChat: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  createChat: async (payload: createChatPayload) => {
    const { authUser } = useAuthStore.getState();
    const { getChats, getMessages } = get();
    try {
      const res = await axiosInstance.post("/chat/create", payload);
      // Optional: Push new chat into state if needed
      set({
        selectedChat: {
          ...res.data,
          user: authUser.role === POSTER ? res.data.tasker : res.data.poster,
        },
      });
      getChats();
      getMessages(res.data.id);
      return res.data;
    } catch (error: any) {
      console.error("Create chat error:", error);
      // toast.error(error?.response?.data?.message || "Failed to create chat");
    }
  },

  getChats: async () => {
    set({ isUsersLoading: true });
    const { authUser } = useAuthStore.getState();
    try {
      const res = await axiosInstance.get<Chat[]>("/chat/list");
      set({
        chats: res.data.map((elm) => ({
          ...elm,
          user: authUser.role === POSTER ? elm.tasker : elm.poster,
        })),
      });
    } catch (error: any) {
      console.error("Chat fetch error", error);
      // toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (chatId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(
        `/chat/messages/${chatId}`
      );
      set({ messages: res.data });
    } catch (error: any) {
      console.error("Message fetch error", error);
      // toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: { text: string }) => {
    const { socket, authUser } = useAuthStore.getState();
    const { selectedChat } = get();

    if (!selectedChat || !authUser) return;

    const cleanMessage = {
      chatId: selectedChat.id,
      text: messageData.text,
      receiverId: selectedChat.user?.id || "",
      senderId: authUser.id,
    };

    try {
      socket.emit("sendMessage", cleanMessage);
    } catch (error: any) {
      console.error("Send message error", error);
      // toast.error(error.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedChat } = get();
    const { authUser, socket } = useAuthStore.getState();

    if (!selectedChat || !socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isForCurrentChat =
        (newMessage.senderId === selectedChat.user?.id &&
          newMessage.receiverId === authUser.id) ||
        (newMessage.receiverId === selectedChat.user?.id &&
          newMessage.senderId === authUser.id);

      if (!isForCurrentChat) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedChat: (selectedChat: Chat | null) => {
    set({ selectedChat });
  },
}));
