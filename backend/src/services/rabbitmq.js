const amqp = require("amqplib");

let channel;
async function connectRabbit() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
}

async function sendToQueue(queueName, message) {
  if (!channel)
    throw new Error("RabbitMQ kanalı yok. connectRabbit() çağrılmalı!");
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
}

module.exports = { connectRabbit, sendToQueue };
