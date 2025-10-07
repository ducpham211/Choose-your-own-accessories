import express from "express";
import {
  getCart,
  addCartItem,
  getCartItems,
  deleteCartItem,
  updateQuantity,
} from "../controller/cartController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", getUserIdFromSession, getCart);
router.get("/items", getUserIdFromSession, getCartItems);
router.post("/items", getUserIdFromSession, addCartItem);
router.delete("/items/:id", getUserIdFromSession, deleteCartItem);
router.put("/items/:id", getUserIdFromSession, updateQuantity);
export default router;
