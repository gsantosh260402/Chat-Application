import express from 'express';
const router = express.Router();
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

router.use(protectRoute);
router.get("/contacts" , getAllContacts);
router.get("/chats" , getChatPartners);
router.get("/:id" , getMessagesByUserId);
router.post("/send/:id" , sendMessage );

export default router;