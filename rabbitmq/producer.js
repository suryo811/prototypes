import amqplib from "amqplib";

export const sendMessage = async (msg) => {
  try {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "task_queue";
    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Message sent: ${msg}`);

    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
