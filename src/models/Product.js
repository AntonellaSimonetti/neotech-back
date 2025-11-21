import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    categoria: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    imagen: {
      type: String, // URL
      required: false
    },
    marca: {
      type: String,
      required: false
    },
    modelo: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);
