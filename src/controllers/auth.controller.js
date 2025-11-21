import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTRO
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar campos
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Ver si ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// LOGIN
export const login = async (req, res) => {
    
  try {
    console.log("BODY RECIBIDO:", req.body);
    const { email, password } = req.body;

    // Validar email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

  
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// crear admin
export const crearAdminSiNoExiste = async () => {
  try {
    const admin = await User.findOne({ rol: "admin" });

    if (!admin) {
      await User.create({
        nombre: "Dueño",
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        rol: "admin",
      });

      console.log("🟢 Admin creado automáticamente");
    }
  } catch (error) {
    console.error("❌ Error creando admin:", error);
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ocultamos password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
