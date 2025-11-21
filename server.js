import fs from "fs";
import app from "./src/app.js";

// 🔥 Cargar variables manualmente
const env = fs.readFileSync(".env.local", "utf-8")
  .split("\n")
  .filter(Boolean);

env.forEach(line => {
  const [key, value] = line.split("=");
  process.env[key] = value;
});

// Debug
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
