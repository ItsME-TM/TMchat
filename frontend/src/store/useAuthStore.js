import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data});
        }catch(error){
            console.error("Check auth error:", error);
            set({ authUser: null });
        }finally{
            set({ isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data});

            toast.success("Signup successful! Welcome aboard.");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({ isSigningUp: false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true});
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data});

            toast.success("Login successful! Welcome back.");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false});
        }
    },

    logout: async () => {
        set({ isLoggingOut: true});
        try{
            await axiosInstance.post("/auth/logout");
            set({ authUser: null});

            toast.success("Logout successful! See you again.");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingOut: false});
        }
    },
}));
