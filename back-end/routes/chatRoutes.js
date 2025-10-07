import express from "express";

const router = express.Router();

import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";
import { handleGetChatHistory } from "../controller/chatController.js";

router.get("/messages", getUserIdFromSession, handleGetChatHistory);

export default router;
//chatRoutes.js
