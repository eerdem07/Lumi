const amqp = require("amqplib");

let channel;
async function connectRabbit() {
  if (!channel) {
    const conn = await amqp.connect("amqp://localhost");
    channel = await conn.createChannel();
    await channel.assertQueue("track_logs");
  }
  return channel;
}

async function sendTrackLog(message) {
  const ch = await connectRabbit();
  ch.sendToQueue("track_logs", Buffer.from(JSON.stringify(message)));
}

module.exports = { sendTrackLog };
