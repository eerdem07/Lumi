const amqp = require("amqplib");

async function main() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue("track_logs");
  console.log("Track logları dinleniyor...");
  ch.consume("track_logs", (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log("Track log:", data);
    ch.ack(msg);
  });
}
main();
