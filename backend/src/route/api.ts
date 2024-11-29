import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";

const upload = multer();
const apiRouter = express.Router();

apiRouter.route("/profile/:user_id(\\d+)").put(UserController.update);


/*----------------- Connections -----------------*/
apiRouter.post(
  "/connection-requests",
  upload.none(),
  authMiddleware,
  ConnectionController.storeConnectionRequest
);
apiRouter.delete(
  "/connections/:from_id(\\d+)/:to_id(\\d+)",
  upload.none(),
  authMiddleware,
  ConnectionController.deleteConnection
);

/*----------------- Connection-Requests -----------------*/
apiRouter.get(
  "/connection-requests/:user_id(\\d+)/pending",
  upload.none(),
  authMiddleware,
  ConnectionController.indexPendingConnectionRequest
);

apiRouter.put(
  "/connection-requests/:from_id(\\d+)/:to_id(\\d+)/:action",
  upload.none(),
  authMiddleware,
  ConnectionController.respondConnectionRequest
);

apiRouter.delete(
  "/connection-requests/:from_id(\\d+)/:to_id(\\d+)",
  upload.none(),
  authMiddleware,
  ConnectionController.deleteConnectionRequest
);

export default apiRouter;
