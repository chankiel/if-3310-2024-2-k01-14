import express from "express";
import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 4001;

const redis = new Redis({
  host: "localhost",
  port: 6379,
})

redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

app.get("/health", async (req, res) => {
  try {
    const redisStatus = await redis.ping();
    if (redisStatus === "PONG") {
      return res.status(200).send("OK");
    }
    throw new Error("Redis not responding");
  } catch (error) {
    console.error("Health check failed:", error.message);
    return res.status(500).send("Redis Unhealthy");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
