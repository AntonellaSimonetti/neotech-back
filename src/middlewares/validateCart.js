import Product from "../models/Product.js";

export const validateAddToCart = async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "El productId es obligatorio" });
  }

  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
  }

  // Buscar el producto
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  // Validación de stock
  if (quantity > product.stock) {
    return res.status(400).json({
      message: `No hay suficiente stock. Stock disponible: ${product.stock}`,
    });
  }

  next();
};


export const validateUpdateQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "El productId es obligatorio" });
  }

  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (quantity > product.stock) {
    return res.status(400).json({
      message: `Stock insuficiente. Máximo disponible: ${product.stock}`,
    });
  }

  next();
};


export const validateRemoveFromCart = (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "El productId es obligatorio" });
  }

  next();
};
