import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

import {
  getUserCount,
  getSalesCount,
  getTotalRevenue,
  getBestSellers,
  getOrdersByStatus
} from "../controllers/adminController.js";

const router = Router();

// Todas estas rutas requieren ADMIN
router.use(verifyToken, isAdmin);

router.get("/users/count", getUserCount);
router.get("/sales/count", getSalesCount);
router.get("/sales/total", getTotalRevenue);
router.get("/products/best-sellers", getBestSellers);
router.get("/orders/status", getOrdersByStatus);

export default router;
