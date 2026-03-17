import express from "express";
import { sendMessage } from "./producer.js";

const app = express();
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const { message } = req.body;
  await sendMessage(message);
  res.status(200).json({ message: "Message sent successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
