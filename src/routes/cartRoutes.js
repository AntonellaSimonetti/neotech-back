import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCart
} from "../controllers/cartController.js";

const router = Router();

// Agregar producto al carrito
router.post("/add", verifyToken, addToCart);

// Editar cantidad
router.put("/update", verifyToken, updateQuantity);

// Eliminar un producto
router.delete("/remove", verifyToken, removeFromCart);

// Vaciar carrito
router.delete("/clear", verifyToken, clearCart);

// Ver carrito del usuario
router.get("/", verifyToken, getCart);

export default router;
