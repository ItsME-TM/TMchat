import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create ((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", String(!get().isSoundEnabled))
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab : (tab) => set({ activeTab: tab}),

    setSelectedUser: (selectedUser) => set({ selectedUser}),

    getAllContacts : async () => {
        set({ isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data});
        }catch(error){
            toast.error(error.response?.data?.message || "Failed to load contacts. Please try again.");
        }finally{
            set({ isUsersLoading: false});
        }
    },

    getMyChatPartners : async () => {
        set({ isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data});
        }catch(error){
            toast.error(error.response?.data?.message || "Failed to load chats. Please try again.");
        }finally{
            set({ isUsersLoading: false});
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data});
        }catch(error){
            toast.error(error.response?.data?.message || "Failed to load messages. Please try again.");
        }finally{
            set({ isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const { authUser } = useAuthStore.getState();
        const { messages, selectedUser} = get();

        const tempId = `temp-${Date.now()}`;
        //we use optimistic UI update to show the message immediately
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        set({ messages: [...messages, optimisticMessage]});

        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: messages.concat(res.data)});
        }catch(error){
            //remove the optimistic message on failure
            set({ messages: messages})
            toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
        }
    }
}))