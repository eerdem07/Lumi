require("dotenv").config({ path: "./src/config/.env" });
const mongoose = require("mongoose");
const app = require("./index");
const redisClient = require("./src/redisClient");

process.on("uncaughtException", (err) => {
  console.error("Yakalanmamış Hata:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Promise reddedildi:", err.message);
  process.exit(1);
});

async function startServer() {
  try {
    await redisClient.connect(); // burada await kullanabilirsin!
    console.log("Connected to Redis");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

startServer();
