import express from "express";
import {
  getUserIdFromSession,
  isAdmin,
} from "../middlewares/authMiddlewares.js";
import { getAdminStats } from "../controller/adminController.js";

const router = express.Router();

router.get("/stats", getUserIdFromSession, isAdmin, getAdminStats);

export default router;
//adminRoutes
