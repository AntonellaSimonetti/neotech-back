import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },

    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },

    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },

    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
    },

    imagen: {
      type: String, // URL
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
