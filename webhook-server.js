import express from "express";
import { exec } from "child_process";
const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("🚨 Webhook triggered from Docker Hub!");
  res.status(200).send("OK");

  // Run deploy.sh when webhook is received
  exec("bash /home/mohamedanter/TeamavailTest/deploy.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error during deployment: ${error.message}`);
      return;
    }
    console.log(`✅ Deployment output:\n${stdout}`);
  });
});

app.listen(PORT, () => console.log(`🚀 Webhook server running on port ${PORT}`));

