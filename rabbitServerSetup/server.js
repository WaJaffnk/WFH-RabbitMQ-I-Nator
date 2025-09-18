import amqp from 'amqplib';
import dotenv from 'dotenv';

console.log("=== SERVER.JS STARTED ===");
dotenv.config();
console.log("server file starting...");
let DEFAULT_RABBIT_URL = process.env.DEFAULT_RABBIT_URL;

async function connect() {
  try {
    const connection = await amqp.connect(DEFAULT_RABBIT_URL);
    const channel = await connection.createChannel();

    const exchangeName = 'wfh-inator-logging-exchange';
    const queueName = 'wfh-inator-logging-queue';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchangeName, '', {}, true);

    console.log(`RabbitMQ setup complete: exchange=${exchangeName}, queue=${queueName}`);

    await channel.close();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

 await connect();
 process.exit(0)