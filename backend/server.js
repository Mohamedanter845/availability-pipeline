const express = require("express");
const path = require("path");
const cors = require("cors");
const client = require("prom-client");

const app = express();
const register = new client.Registry();
const PORT = process.env.PORT || 4000;

// ✅ Collect default system metrics (CPU, Memory, etc.)
client.collectDefaultMetrics({ register });

// ✅ Custom metric: count all HTTP requests
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests received",
});
register.registerMetric(httpRequestsTotal);

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Middleware: increment counter for every request
app.use((req, res, next) => {
  httpRequestsTotal.inc();
  next();
});

// ✅ Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// ✅ Helper function لتوليد أرقام عشوائية
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ Status Endpoint
app.get("/api/status", (req, res) => {
  res.json({
    server: "running",
    containers: 3,
    lastDeploy: new Date().toLocaleString(),
  });
});

// ✅ Deployments Endpoint
app.get("/api/deployments", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Frontend",
      version: "v1.2.0",
      status: "running",
      lastDeploy: new Date().toLocaleString(),
    },
    {
      id: 2,
      name: "Backend",
      version: "v3.4.1",
      status: "running",
      lastDeploy: new Date().toLocaleString(),
    },
    {
      id: 3,
      name: "Worker",
      version: "v2.0.5",
      status: getRandomInt(0, 1) ? "running" : "stopped",
      lastDeploy: new Date().toLocaleString(),
    },
  ]);
});

// ✅ Metrics Endpoint (لداتا الـ Dashboard)
app.get("/api/metrics", (req, res) => {
  const cpuUsage = getRandomInt(25, 80);
  const ramUsage = getRandomInt(40, 90);
  const cpuHistory = Array.from({ length: 8 }, () => getRandomInt(20, 90));
  const ramHistory = Array.from({ length: 8 }, () => getRandomInt(40, 95));

  res.json({
    cpuUsage,
    ramUsage,
    cpuHistory,
    ramHistory,
    lastUpdate: new Date().toLocaleTimeString(),
  });
});

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log("✅ Deployed successfully at", new Date().toLocaleString());
  });
}

// ✅ Export for testing or integration
module.exports = app;
