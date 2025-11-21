// Middleware para verificar token (lo completamos después)
export const authRequired = (req, res, next) => {
  console.log("Auth middleware funcionando ✔");
  next();
};
