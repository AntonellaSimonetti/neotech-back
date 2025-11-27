import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from "../controllers/wishlistController.js";

const router = Router();

router.post("/add", verifyToken, addToWishlist);

router.delete("/remove", verifyToken, removeFromWishlist);

router.get("/", verifyToken, getWishlist);

export default router;
