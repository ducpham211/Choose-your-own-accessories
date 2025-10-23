import express from "express";
import {
  getOrderItemsByOrderId,
  addOrder,
  getOrderByUserId,
} from "../controller/orderController.js";
import {
  getUserIdFromSession,
  isAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/:orderId", getUserIdFromSession, isAdmin, getOrderItemsByOrderId);
router.get("/", getUserIdFromSession, getOrderByUserId);
router.post("", getUserIdFromSession, addOrder);
export default router;
