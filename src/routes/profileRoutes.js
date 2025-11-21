import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  getOrderHistory
} from "../controllers/profileController.js";

const router = Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.put("/password", verifyToken, changePassword);
router.get("/orders", verifyToken, getOrderHistory);

export default router;
