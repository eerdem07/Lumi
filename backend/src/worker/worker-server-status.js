const amqp = require("amqplib");

async function consumeServerStatusQueue() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "server-status-queue";
  await channel.assertQueue(queue, { durable: true });

  console.log("Server status kuyruğu dinleniyor...");
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log("Aktiflik mesajı alındı:", data);
      channel.ack(msg);
    }
  });
}

consumeServerStatusQueue().catch(console.error);
