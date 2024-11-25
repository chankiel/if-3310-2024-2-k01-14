import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";

const upload = multer()
const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter
  .route("/profile/:user_id(\\d+)")
  .get(UserController.show)
  .put(UserController.update);


apiRouter.post(
  "/connection-request",
  upload.none(),
  ConnectionController.storeConnectionRequest
);

apiRouter.get(
  "/connection-request/pending",
  upload.none(),
  ConnectionController.indexPendingConnectionRequest
);

apiRouter.put(
  "/connection-request/respond",
  upload.none(),
  ConnectionController.respondConnectionRequest
);

export default apiRouter;
