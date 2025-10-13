import { Router } from "express";
import userRoutes from "./userRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import chatRoutes from "./chatRoutes.js";
import adminRoutes from "./adminRoutes.js";
import shippingRoutes from "./shippingRoutes.js";
import momoRoutes from "./momoRoutes.js";

const router = Router();

router.use("/auth", userRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/chat", chatRoutes);
router.use("/admin", adminRoutes);
router.use("/shipping", shippingRoutes);
router.use("/payment", momoRoutes);

export default router;
//index.js
