import Product from "../models/Product.js";
//esto pertenece solo al admin sobre la gestion de productos

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto 
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Elimina producto
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
