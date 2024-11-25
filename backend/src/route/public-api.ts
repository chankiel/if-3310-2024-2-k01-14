import express, { Router } from "express";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";

const publicRouter = express.Router();
const upload = multer()

publicRouter.post("/register", upload.none(), UserController.store);
publicRouter.post("/login", upload.none(), UserController.login);

publicRouter.get("/users/:query?",UserController.index)
publicRouter.get("/connections/:user_id(\\d+)",ConnectionController.indexConnection)
export default publicRouter