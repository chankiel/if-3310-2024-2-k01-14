import { Socket } from "socket.io";
import { ChatService } from "../service/chat-service";
import { io } from "../application/web";
import { AuthRequest } from "../middleware/auth-middleware";
import { Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { UserService } from "../service/user-service";
import { formatResponse } from "../utils/ResponseFormatter";

export class ChatController {
  static setupSocket() {
    io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", (roomId: string, userId: string) => {
        ChatService.registerUser(userId, socket.id);
        ChatService.joinRoom(socket, roomId);
      });

      socket.on("sendTyping", (roomId: string, isTyping: boolean) => {
        ChatService.sendIsTyping(socket, roomId, isTyping);
      });

      socket.on(
        "sendMessage",
        (
          senderId: string,
          receiverId: string,
          roomId: string,
          message: string
        ) => {
          ChatService.sendMessage(
            socket,
            senderId,
            receiverId,
            roomId,
            message
          );
        }
      );

      socket.on("disconnect", () => {
        ChatService.unregisterUser(socket.id);
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  static async getReceiver(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const room_id = req.params.room_id;
      const userId = Number(req.userId);
      const room_chat = await ChatService.getRoomChat(room_id);

      if (
        userId !== room_chat.first_user_id &&
        userId !== room_chat.second_user_id
      ) {
        throw new ResponseError(
          403,
          `User unauthorized. User isn't part of the room chat!`
        );
      }

      const receiverId =
        userId == room_chat.first_user_id
          ? room_chat.second_user_id
          : room_chat.first_user_id;

      const receiver = await UserService.get(receiverId, userId);

      const response = formatResponse(
        true,
        receiver,
        "Receiver retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getMessages(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const room_id = req.params.room_id;
      const userId = Number(req.userId);
      const room_chat = await ChatService.getRoomChat(room_id);
      if (
        userId !== room_chat.first_user_id &&
        userId !== room_chat.second_user_id
      ) {
        throw new ResponseError(
          403,
          `User unauthorized. User isn't part of the room chat!`
        );
      }

      const messages = await ChatService.getMessages(room_id);

      const response = formatResponse(
        true,
        messages,
        "Messages retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getInbox(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId_param = Number(req.params.user_id);
      const userId = Number(req.userId);

      if (userId != userId_param) {
        throw new ResponseError(403, `User unauthorized!`);
      }

      const inboxes = await ChatService.getInbox(userId);

      const response = formatResponse(
        true,
        inboxes,
        "Inboxes retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getRoomId(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const first_id = Number(req.params.first_id);
      const second_id = Number(req.params.second_id);
      const userId = Number(req.userId);

      if (userId !== first_id && userId != second_id) {
        throw new ResponseError(403, `User unauthorized!`);
      }

      const room_id = await ChatService.getRoomByUsers(first_id, second_id);

      const response = formatResponse(
        true,
        { room_id: room_id.id },
        "Room id retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
