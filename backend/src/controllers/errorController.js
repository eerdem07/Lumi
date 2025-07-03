module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    status: err.status || "error",
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
