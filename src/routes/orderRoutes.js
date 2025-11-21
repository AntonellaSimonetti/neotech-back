import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = Router();

// Crear orden (user)
router.post("/create", verifyToken, createOrder);

// Ver órdenes del usuario
router.get("/my-orders", verifyToken, getUserOrders);

// Ver todas las órdenes (admin)
router.get("/", verifyToken, isAdmin, getAllOrders);

// Cambiar estado (admin)
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

export default router;
