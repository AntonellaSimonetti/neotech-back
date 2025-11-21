import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


const app = express();


app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando ✔");
});

export default app;
