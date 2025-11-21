import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();
//First check for bots and rate limits, then protect the route using auth middleware
router.use(arcjetProtection, protectRoute)

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.post("/send/:id", sendMessage);
router.get("/:id", getMessagesByUserId);

export default router;