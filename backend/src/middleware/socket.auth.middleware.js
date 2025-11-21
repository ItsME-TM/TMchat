import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try{
        //extract token from socket handshake headers
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if(!token){
            console.log("Socket auth failed: No token provided");
            return next(new Error("Authentication error: No token provided"));
        }

        //verify token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded){
            console.log("Socket auth failed: Invalid token");
            return next(new Error("Authentication error: Invalid token"));
        }

        //fetch user from database
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket auth failed: User not found");
            return next(new Error("Authentication error: User not found"));
        }

        //attach user to socket object for further use
        socket.user = user;
        socket.userId = user._id.toString();
        console.log(`Socket auth successful for user: ${user.fullName} (${user._id})`);

        next();
    }catch(error){

    }
}