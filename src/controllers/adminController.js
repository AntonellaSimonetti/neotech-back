import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsuarios: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSalesCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({ status: "pagado" });
    res.json({ totalVentas: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "pagado" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    res.json({ totalFacturado: result[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// producto mas vendido
export const getBestSellers = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      { $group: {
          _id: "$items.productId",
          cantidadVendida: { $sum: "$items.quantity" }
      }},
      { $sort: { cantidadVendida: -1 } },
      { $limit: 5 },
      { $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "producto"
      }},
      { $unwind: "$producto" }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  estado de las ordenes
export const getOrdersByStatus = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: {
          _id: "$status",
          cantidad: { $sum: 1 }
      }},
      { $sort: { cantidad: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
