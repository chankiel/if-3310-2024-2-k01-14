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

      socket.on(
        "sendMessage",
        (
          senderId: string,
          receiverId: string,
          roomId: string,
          message: string
        ) => {
          ChatService.sendMessage(socket,senderId,receiverId,roomId,message);
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

      const messages = await ChatService.getMessages(room_id);

      const response = formatResponse(
        true,
        messages,
        "Receiver retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
