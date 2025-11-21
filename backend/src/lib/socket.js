import { Server } from "socket.io";
import { ENV } from "./env.js";
import express from "express";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

// we create the http server first and then pass it to socket.io
const io = new Server(server,{
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

//apply authentication middleware to all socket connections 
io.use(socketAuthMiddleware);

//store online users in a map (key: userId, value: socketId)
const userSocketMap = new Map();

io.on("connection", (socket) => {
    console.log("New client connected:", socket.user.fullName);
    const userId = socket.userId;

    //add user to online users map
    //key is userId and value is socket.id
    //example : "user123": "socket_abc123"
    userSocketMap[userId] = socket.id;

    //io.emit use to broadcast to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //disconnect event and update online users map
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };