import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validateRegister.js";


const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/users", getAllUsers); // para obtener todos los usuarios


router.post("/debug", (req, res) => {
  console.log("POSTMAN BODY:", req.body);
  return res.json({ body: req.body });
});

export default router;
