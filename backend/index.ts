import express, { Request, Response, NextFunction } from "express";
import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 4001;

const redis = new Redis({
  host: "redis",
  port: 6379,
});

redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err: Error) => {
  console.error("Redis connection error:", err);
});

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
