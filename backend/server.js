require("dotenv").config({ path: "./src/config/.env" });
const mongoose = require("mongoose");
const app = require("./index");
const { connectRabbit } = require("./src/services/rabbitmq"); // Ekledik

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
    // RabbitMQ
    await connectRabbit();
    console.log("RabbitMQ bağlantısı kuruldu");

    // MONGO
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Server
    app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

startServer();
