import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";
import { ChatController } from "../controller/chat-controller";
import { PushController } from "../controller/push-controller";
import { FeedController } from "../controller/feed-controller";

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

/*----------------- Room Chat -----------------*/
apiRouter.get(
  "/room-chats/:room_id(\\d+)/receiver",
  upload.none(),
  authMiddleware,
  ChatController.getReceiver
)

/*----------------- Chat -----------------*/
apiRouter.get(
  "/chats/:room_id(\\d+)",
  upload.none(),
  authMiddleware,
  ChatController.getMessages,
)

/*----------------- Connections -----------------*/
apiRouter.post(
  "/feed",
  upload.none(),
  authMiddleware,
  FeedController.store
)

apiRouter.post(
  "/api/subscribe",
  upload.none(),
  authMiddleware,
  PushController.subscribe,
)

apiRouter.post(
  "/api/send-notification",
  upload.none(),
  authMiddleware,
  PushController.sendPushNotification,
)


export default apiRouter;
