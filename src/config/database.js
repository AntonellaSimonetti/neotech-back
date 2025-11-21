import mongoose from "mongoose";
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("💚 MongoDB conectado exitosamente!");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};
