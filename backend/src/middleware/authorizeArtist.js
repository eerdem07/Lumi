module.exports = (req, res, next) => {
  if (req.user.role !== "artist" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
  }
  next();
};
