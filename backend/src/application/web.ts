import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import Redis from "ioredis";

export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

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