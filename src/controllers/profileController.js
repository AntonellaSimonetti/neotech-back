import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Order from "../models/Order.js";

// perfil del usuario
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const fields = (({ nombre, email, direccion, telefono }) => ({
      nombre,
      email,
      direccion,
      telefono
    }))(req.body);

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      fields,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cambiar contraseña
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }


    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Historial de ordenes
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.productId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
