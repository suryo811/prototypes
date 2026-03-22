import { proxyActivities } from "@temporalio/workflow";

const { greet } = proxyActivities({
  startToCloseTimeout: "1 minute",
  retry: {
    maximumAttempts: 2,
  },
});

export async function suryoWorkflow(name) {
  return await greet(name);
}
