import { Router } from "express";
import protect from "../middleware/auth.js";
import {
  getConversations,
  getMessagesWithUser,
  sendMessage,
} from "../controllers/messageController.js";

const router = Router();

router.use(protect);

router.get("/conversations", getConversations);
router.get("/:userId", getMessagesWithUser);
router.post("/", sendMessage);

export default router;
