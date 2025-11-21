import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productos: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "La cantidad mínima es 1"],
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: [0, "El total no puede ser negativo"],
    },

    direccion: {
      type: String,
      required: [true, "La dirección de envío es obligatoria"],
    },

    estado: {
      type: String,
      enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },

    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
