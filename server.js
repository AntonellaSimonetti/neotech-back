if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import mongoose from "mongoose";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

import "./src/models/User.js";

import { crearAdminSiNoExiste } from "./src/controllers/auth.controller.js";

(async () => {
  try {
   
    await connectDB();

    await crearAdminSiNoExiste();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en puerto ${PORT}`);
      console.log("MONGO_URI:", process.env.MONGO_URI);
    });

  } catch (err) {
    console.error(" Error en servidor:", err);
    process.exit(1);
  }
})();
