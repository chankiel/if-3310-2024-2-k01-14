import express, { Router } from "express";
import { UserController } from "../controller/user-controller";

const publicRouter = express.Router();

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);

export default publicRouter