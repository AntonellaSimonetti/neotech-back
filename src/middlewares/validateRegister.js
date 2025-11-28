export function validateRegister(req, res, next) {
  const { nombre, email, password } = req.body;

  // Validar campos obligatorios
  if (!nombre || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nombre, email y contraseña son obligatorios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }

  next(); 
}
