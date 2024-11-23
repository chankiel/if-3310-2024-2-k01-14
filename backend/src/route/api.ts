import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter
  .route("/profile/:user_id(\\d+)")
  .get(UserController.get)
  .put(UserController.update);
export default apiRouter;
