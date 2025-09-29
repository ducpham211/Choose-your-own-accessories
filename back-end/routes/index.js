import { Router } from "express";
import authRoutes from "./authRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/products", productRoutes);

export default router;
