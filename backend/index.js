const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const AppError = require("./src/utils/AppError");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());
app.use(morgan("dev"));

// ROUTE DOSYALARI
const authRoutes = require("./src/routes/authRoutes");
const trackRoutes = require("./src/routes/trackRoutes");
const mediaRoutes = require("./src/routes/mediaRoutes");
const errorController = require("./src/controllers/errorController");
const playlistRoutes = require("./src/routes/playlistRoutes");
const userRoutes = require("./src/routes/userRoutes");

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

app.use(errorController);

module.exports = app;
