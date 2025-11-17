import axios from 'axios';

export const axiosInstance = axios.create({
    //set backend URL based on environment because of we deploy both frontend and backend 
    // on same domain in production mode we use relative path except in development mode
    baseURL: import.meta.env.MODE === 'development' ? "http://localhost:3000/api" : "/api",
    //Include cookies in requests
    withCredentials: true,
});