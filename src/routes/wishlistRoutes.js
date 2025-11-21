import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from "../controllers/wishlistController.js";

const router = Router();

// Agregar a favoritos
router.post("/add", verifyToken, addToWishlist);

// Eliminar de favoritos
router.delete("/remove", verifyToken, removeFromWishlist);

// Listar favoritos del usuario
router.get("/", verifyToken, getWishlist);

export default router;
