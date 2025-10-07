import express from "express";
import {
  getUserIdFromSession,
  isAdmin,
} from "../middlewares/authMiddlewares.js";
import {
  getAdminStats,
  getAllOfOrders,
} from "../controller/adminController.js";

const router = express.Router();

router.get("/stats", getUserIdFromSession, isAdmin, getAdminStats);
router.get("/order", getAllOfOrders);
export default router;
//adminRoutes
