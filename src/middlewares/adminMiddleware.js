export const adminOnly = (req, res, next) => {
  console.log("Admin middleware funcionando ✔");
  next();
};
