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


router.get("/", getProducts);


router.get("/:id", getProductById);


router.put("/:id", verifyToken, isAdmin,updateProduct);


router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
