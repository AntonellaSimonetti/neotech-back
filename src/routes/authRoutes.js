import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers); // para obtener todos los usuarios


router.post("/debug", (req, res) => {
  console.log("POSTMAN BODY:", req.body);
  return res.json({ body: req.body });
});

export default router;
