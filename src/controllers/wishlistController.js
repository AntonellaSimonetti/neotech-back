import User from "../models/User.js";

// productos preferidos
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    
    if (user.favoritos.includes(productId)) {
      return res.status(400).json({ message: "El producto ya está en favoritos" });
    }

    user.favoritos.push(productId);
    await user.save();

    res.json({ message: "Producto agregado a favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    user.favoritos = user.favoritos.filter(id => id.toString() !== productId);

    await user.save();

    res.json({ message: "Producto eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar favoritos
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favoritos");

    res.json(user.favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
