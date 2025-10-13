import express from "express";
import {
  getOrderItemsByOrderId,
  addOrder,
} from "../controller/orderController.js";
import {
  getUserIdFromSession,
  isAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/:orderId", getUserIdFromSession, isAdmin, getOrderItemsByOrderId);
router.post("", getUserIdFromSession, addOrder);
export default router;
