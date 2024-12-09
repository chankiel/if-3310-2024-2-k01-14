import express from "express";
import publicRouter from "../route/public-api";
import apiRouter from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";
import Redis from "ioredis";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"
import { Server } from "socket.io";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs'

const swaggerDocument = yaml.load('./api-doc.yml');

const web = express();
web.use(cors({ origin: "http://localhost:5173", credentials: true }));
web.use(express.json());
web.use(cookieParser());

web.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

web.use("/api", apiRouter);
web.use("/api", publicRouter);

web.use(errorMiddleware);

web.use("/store", express.static(path.join(__dirname, "../store")));

const redis = new Redis({
  host: "redis",
  port: 6379,
  retryStrategy(times) {
      const delay = Math.min(times*50,2000);
      return delay;
  },
});

redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err: Error) => {
  console.error("Redis connection error:", err);
});

const server = http.createServer(web)
const io = new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
  }
})

export {server,io,redis}