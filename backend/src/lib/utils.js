import jwt from "jsonwebtoken";
import {ENV} from "./env.js";

export const generateToken = (userId, res) => {
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId}, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,//orevent XSS attacks: cross site scripting
        secure: ENV.NODE_ENV === "development" ? false : true,
        sameSite: "strict",// CSRF protection
    });

    return token;
}