import express from "express";
import publicRouter from "../route/public-api";
import apiRouter from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";
import Redis from "ioredis";
import cors from "cors";
import cookieParser from "cookie-parser";

export const web = express();

web.use(cors({origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
    credentials: true, // Izinkan cookie atau kredensial
    }));
web.use(express.json());
web.use(cookieParser())

web.use('/api',apiRouter);
web.use('/api',publicRouter);
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