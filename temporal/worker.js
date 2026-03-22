import { createRequire } from "node:module";
import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities.js";

const require = createRequire(import.meta.url);

async function run() {
  // Step 1: Establish a connection with Temporal server.
  const connection = await NativeConnection.connect({
    address: "localhost:7233",
  });

  try {
    // Step 2: Register Workflows and Activities with the Worker.
    const worker = await Worker.create({
      connection,
      namespace: "default",
      taskQueue: "hello-world",
      workflowsPath: require.resolve("./workflow.js"),
      activities,
    });
    // Step 3: Start accepting tasks on the `hello-world` queue
    await worker.run();
  } finally {
    // Close the connection once the worker has stopped
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
