import express, { Router } from "express";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";

const publicRouter = express.Router();

publicRouter.post("/register", UserController.store);
publicRouter.post("/login", UserController.login);

publicRouter.get("/users/:query?",UserController.index)
publicRouter.get("/connections/:user_id(\\d+)",ConnectionController.indexConnection)
export default publicRouter