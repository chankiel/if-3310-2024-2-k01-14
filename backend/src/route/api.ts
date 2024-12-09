import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ConnectionController } from "../controller/connection-controller";
import multer from "multer";
import { ChatController } from "../controller/chat-controller";
import { PushController } from "../controller/push-controller";
import { FeedController } from "../controller/feed-controller";
import { AuthController } from "../controller/auth-controller";

const upload = multer();
const apiRouter = express.Router();

apiRouter.route("/profile/:user_id(\\d+)").put(upload.single("profile_photo"), UserController.update);

// apiRouter.get(
//   "/recommendations/:user_id(\\d+)",
//   upload.none(),
//   authMiddleware,
//   UserController.showRecommendations
// );


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
);

/*----------------- Chat -----------------*/
apiRouter.get(
  "/chats/:room_id(\\d+)",
  upload.none(),
  authMiddleware,
  ChatController.getMessages,
);

apiRouter.get(
  "/chats/:user_id(\\d+)/inbox",
  upload.none(),
  authMiddleware,
  ChatController.getInbox,
);

/*----------------- Connections -----------------*/
apiRouter.post(
  "/feed",
  upload.none(),
  authMiddleware,
  FeedController.store
);

/*----------------- Push Notifications -----------------*/
apiRouter.post(
  "/subscribe",
  upload.none(),
  PushController.subscribe,
);

apiRouter.post(
  "/send-chat-notification",
  upload.none(),
  PushController.sendChatNotification,
);

apiRouter.post(
  "/send-new-post-notification",
  upload.none(),
  PushController.sendNewPostNotification,
);

/*----------------- Feeds -----------------*/
apiRouter.get(
  "/feed",
  upload.none(),
  authMiddleware,
  FeedController.showFeedsPagination
);

apiRouter.delete(
  "/feed/:feed_id(\\d+)",
  upload.none(),
  authMiddleware,
  FeedController.deleteFeed
);

apiRouter.put( 
  "/feed/:feed_id(\\d+)",
  upload.none(),
  authMiddleware,
  FeedController.editFeed
);


/*----------------- Auth -----------------*/
apiRouter.post(
  "/logout",
  upload.none(),
  authMiddleware,
  AuthController.logout
);

export default apiRouter;
