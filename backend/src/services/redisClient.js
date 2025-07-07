const redis = require("redis");

const redisClient = redis.createClient(); // localhost:6379

redisClient.on("error", (err) => {
  console.error("Redis bağlantı hatası:", err);
});

(async () => {
  await redisClient.connect();
  console.log("Redis bağlantısı kuruldu.");
})();

module.exports = redisClient;
