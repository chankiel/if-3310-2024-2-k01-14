import express from "express";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";
import { AuthController } from "../controller/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { FeedController } from "../controller/feed-controller";

const publicRouter = express.Router();
const upload = multer()

/*----------------- Auth -----------------*/
publicRouter.post("/register", upload.none(), UserController.store);
publicRouter.post("/login", upload.none(), AuthController.login);

/*----------------- User / Profile -----------------*/
publicRouter.get("/profile/",UserController.index)
publicRouter.get("/profile/self",authMiddleware,AuthController.self)
publicRouter.get("/profile/:user_id(\\d+)",UserController.show)
publicRouter.get("/show-image/:user_id",UserController.showImage)

/*----------------- Connections -----------------*/
publicRouter.get("/connections/:user_id(\\d+)",ConnectionController.indexConnection)


export default publicRouter