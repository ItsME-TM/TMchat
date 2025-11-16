import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("Get all contacts error:", error);
        res.status(500).json({message: "Server error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try{
        const myId = req.user._id;
        const {id: userToChatId} = req.params;

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId },
            ],
        });

        res.status(200).json(messages);
    }catch(error){
        console.error("Get messages by user ID error:", error);
        res.status(500).json({message: "Server error"});
    }
}