import User from "../models/User.js";
import Product from "../models/Product.js";

// Obtener carrito
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("carrito.productId");
    res.json(user.carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar producto
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user.id);

    const exists = user.carrito.find(i => i.productId.toString() === productId);

    if (exists) {
      exists.quantity += quantity;
    } else {
      user.carrito.push({ productId, quantity });
    }

    await user.save();

    res.json({ message: "Producto agregado", carrito: user.carrito });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cantidad
export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user.id);

    const item = user.carrito.find(i => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Producto no está en el carrito" });

    item.quantity = quantity;

    await user.save();

    res.json({ message: "Cantidad actualizada", carrito: user.carrito });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);

    user.carrito = user.carrito.filter(i => i.productId.toString() !== productId);

    await user.save();

    res.json({ message: "Producto eliminado", carrito: user.carrito });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.carrito = [];
    await user.save();

    res.json({ message: "Carrito vaciado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

