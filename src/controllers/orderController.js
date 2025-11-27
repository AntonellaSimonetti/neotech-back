import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Crear orden
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("carrito.productId");

    if (!user || user.carrito.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }


    const items = user.carrito.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.precio
    }));

    // Calcular el total
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    
    const newOrder = await Order.create({
      user: userId,
      items,
      total
    });

    
    user.carrito = [];
    await user.save();

    res.status(201).json({
      message: "Orden creada con éxito",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las ordenes (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar estado (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Orden no encontrada" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
