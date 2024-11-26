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
  .put(UserController.update);

apiRouter.post(
  "/connection-requests",
  upload.none(),
  ConnectionController.storeConnectionRequest
);

apiRouter.get(
  "/connection-requests/:user_id(\\d+)/pending",
  upload.none(),
  ConnectionController.indexPendingConnectionRequest
);

apiRouter.put(
  "/connection-requests/:from_id(\\d+)/:to_id(\\d+)/:action",
  upload.none(),
  ConnectionController.respondConnectionRequest
);

apiRouter.delete(
  "/connections/:from_id(\\d+)/:to_id(\\d+)",
  upload.none(),
  ConnectionController.deleteConnection
)


export default apiRouter;
