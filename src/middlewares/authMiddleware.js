
export const authRequired = (req, res, next) => {
  console.log("Auth middleware funcionando ✔");
  next();
};
