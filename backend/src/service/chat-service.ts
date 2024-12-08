import { Socket } from "socket.io";
import { io } from "../application/web";
import { prismaClient } from "../application/database";
import {
  ChatFormat,
  CreateDeleteRoomRequest,
  InboxFormat,
  JoinLeaveRoomRequest,
  MessageData,
} from "../model/chat-model";
import { ResponseError } from "../error/response-error";

export class ChatService {
  static users: Map<string, string> = new Map();

  static registerUser(userId: string, socketId: string) {
    ChatService.users.set(userId, socketId);
    console.log(`User registered: ${userId} with socket ID: ${socketId}`);
  }

  static unregisterUser(socketId: string) {
    ChatService.users.forEach((socket, userId) => {
      if (socket === socketId) {
        ChatService.users.delete(userId);
        console.log(`User unregistered: ${userId}`);
      }
    });
  }

  static async makeRoomChat({ first_id, second_id }: CreateDeleteRoomRequest) {
    const roomChat = await prismaClient.roomChat.create({
      data: {
        first_user_id: first_id,
        second_user_id: second_id,
      },
    });

    return roomChat.id;
  }

  static async deleteRoomChat({
    first_id,
    second_id,
  }: CreateDeleteRoomRequest) {
    const roomChat = await prismaClient.roomChat.delete({
      where: {
        first_user_id_second_user_id: {
          first_user_id: first_id,
          second_user_id: second_id,
        },
      },
    });

    return roomChat.id;
  }

  static async getRoomChat(id: string) {
    const roomChat = await prismaClient.roomChat.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!roomChat) {
      throw new ResponseError(404, "Room Chat not found");
    }

    return roomChat;
  }

  static async joinRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room ${roomId}`);
  }

  static async sendIsTyping(socket: Socket,roomId: string, isTyping: boolean){
    socket.broadcast.to(roomId).emit("updateTyping", isTyping);
  }

  static leaveRoom(socket: Socket, roomId: string) {
    socket.leave(roomId);
    console.log(`User with ID: ${socket.id} leaved room ${roomId}`);
  }

  static async sendMessage(
    socket: Socket,
    senderId: string,
    receiverId: string,
    roomId: string,
    message: string
  ) {
    console.log(senderId, receiverId, message);
    const firstUser = Number(senderId),
      secondUser = Number(receiverId);

    const chat = await prismaClient.chat.create({
      data: {
        from_id: firstUser,
        to_id: secondUser,
        room_id: Number(roomId),
        message: message,
      },
    });

    const data = {
      last_message: message,
      last_sender_id: firstUser,
    };

    await prismaClient.roomChat.update({
      where: {
        id: Number(roomId),
      },
      data: data,
    });

    socket.broadcast.to(roomId).emit("receiveMessage", message);
  }

  static async getMessages(room_id: string): Promise<ChatFormat[]> {
    const messages = await prismaClient.chat.findMany({
      where: {
        room_id: Number(room_id),
      },
    });

    return messages;
  }

  static async getInbox(userId: number): Promise<InboxFormat[]> {
    const inboxes_1 = await prismaClient.roomChat.findMany({
      where: {
        first_user_id: userId,
        last_message: {
          not: null,
        },
        last_sender_id: {
          not: null,
        },
      },
      select: {
        second_user: {
          select: {
            username: true,
            profile_photo_path: true,
          },
        },
        id: true,
        last_message: true,
        last_sender_id: true,
        updated_at: true,
      },
    });

    const formattedInboxes_1: InboxFormat[] = inboxes_1.map((inbox) => ({
      ...inbox,
      username: inbox.second_user.username,
      profile_photo: inbox.second_user.profile_photo_path,
      room_id: inbox.id,

      second_user: undefined,
      id: undefined,
    }));

    const inboxes_2 = await prismaClient.roomChat.findMany({
      where: {
        second_user_id: userId,
        last_message: {
          not: null,
        },
        last_sender_id: {
          not: null,
        },
      },
      select: {
        first_user: {
          select: {
            username: true,
            profile_photo_path: true,
          },
        },
        id: true,
        last_message: true,
        last_sender_id: true,
        updated_at: true,
      },
    });

    const formattedInboxes_2: InboxFormat[] = inboxes_2.map((inbox) => ({
      ...inbox,
      username: inbox.first_user.username,
      profile_photo: inbox.first_user.profile_photo_path,
      room_id: inbox.id,

      first_user: undefined,
      id: undefined,
    }));

    const inboxes = [...formattedInboxes_1, ...formattedInboxes_2];
    return inboxes;
  }
}
