import fs from "fs";
import mongoose from "mongoose";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

// IMPORTAR MODELOS *ANTES* DE USARLOS
import "./src/models/User.js";

import { crearAdminSiNoExiste } from "./src/controllers/auth.controller.js";

// ====================
// CARGAR .env.local MANUALMENTE
// ====================
const rawEnv = fs.readFileSync(".env.local", "utf-8");

rawEnv.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  const value = rest.join("="); // <- permite "=" dentro del value
  process.env[key] = value.trim();
});

console.log("MONGO_URI:", process.env.MONGO_URI);

(async () => {
  try {
    // 1) Conectar DB
    await connectDB();

    // 2) Crear admin DESPUÉS de conectar, y con modelo cargado
    await crearAdminSiNoExiste();

    // 3) Levantar servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error en servidor:", err);
    process.exit(1);
  }
})();
