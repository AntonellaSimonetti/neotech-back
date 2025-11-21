import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    direccion: {
      type: String,
      default: ""
    },
    telefono: {
      type: String,
      default: ""
    },

    // Rol del usuario: admin o user
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    favoritos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    // Carrito del usuario
    carrito: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
