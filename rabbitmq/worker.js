import amqplib from "amqplib";

async function startWorker() {
  const connection = await amqplib.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  const queue = "task_queue";
  await channel.assertQueue(queue, { durable: false });

  channel.prefetch(1); // Process only one message at a time

  console.log("Waiting for messages...");

  channel.consume(
    queue,
    async (msg) => {
      const task = msg.content.toString();
      console.log(`Processing task: ${task}`);

      setTimeout(() => {
        console.log(`Task completed: ${task}`);
        channel.ack(msg);
      }, 1000);
    },
    { noAck: false },
  );

  return channel;
}

startWorker();
