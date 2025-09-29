import express from "express";
import {
  getCart,
  addCartItem,
  getCartItems,
} from "../controller/cartController.js";
import { getUserIdFromSession } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", getUserIdFromSession, getCart);
router.get("/items", getUserIdFromSession, getCartItems);
router.post("/items", getUserIdFromSession, addCartItem);

export default router;
