const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const AppError = require("./src/utils/AppError");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());
app.use(morgan("dev"));

const authRoutes = require("./src/routes/authRoutes");
const trackRoutes = require("./src/routes/trackRoutes");
const mediaRoutes = require("./src/routes/mediaRoutes");
const errorController = require("./src/controllers/errorController");
const playlistRoutes = require("./src/routes/playlistRoutes");
const userRoutes = require("./src/routes/userRoutes");
const statusRoutes = require("./src/routes/statusRoutes");

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

app.use("/api/auth/", authRoutes);
app.use("/api/tracks/", trackRoutes);
app.use("/api/media/", mediaRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/user", userRoutes);
app.use("/api/status/", statusRoutes);

app.use((req, res, next) => {
  next(new AppError(`Bu sunucuda ${req.originalUrl} adresi bulunamadı.`, 404));
});

app.use(errorController);

module.exports = app;
