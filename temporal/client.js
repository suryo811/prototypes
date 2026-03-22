import { Connection, Client } from "@temporalio/client";
import { suryoWorkflow } from "./workflow.js";

async function run() {
  const connection = await Connection.connect({
    address: "localhost:7233",
  });
  const client = new Client({ connection });

  const handle = await client.workflow.start(suryoWorkflow, {
    taskQueue: "hello-world",
    args: ["Temporal"],
    workflowId: "workflow-" + Date.now(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
