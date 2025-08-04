import express from "express";
import {
  initiateChatRoom,
  getMyChatRooms,
  getChatMessages,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/initiate", initiateChatRoom);
router.get("/my", getMyChatRooms);
router.get("/:roomId/messages", getChatMessages);

export default router;
