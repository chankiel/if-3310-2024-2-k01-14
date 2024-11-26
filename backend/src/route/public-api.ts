import express, { Router } from "express";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";

const publicRouter = express.Router();
const upload = multer()

publicRouter.post("/register", upload.none(), UserController.store);
publicRouter.post("/login", upload.none(), UserController.login);
publicRouter.post("/logout",upload.none(),UserController.logout)

publicRouter.get("/profile/",UserController.index)
// publicRouter.get("/profile/me",UserController.s)
publicRouter.get("/connections/:user_id(\\d+)",ConnectionController.indexConnection)

publicRouter.get("/profile/:user_id(\\d+)",UserController.show)

export default publicRouter