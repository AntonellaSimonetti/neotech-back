import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";



const router = Router();

// Crear producto (admin)
router.post("/", verifyToken, isAdmin, createProduct);

// Listar productos
router.get("/", getProducts);

// Obtener producto por ID
router.get("/:id", getProductById);

// Actualizar (admin)
router.put("/:id", verifyToken, isAdmin, updateProduct);

// Eliminar (admin)
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
