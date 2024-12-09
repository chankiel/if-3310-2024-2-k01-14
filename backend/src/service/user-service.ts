import path from "path";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserFormat,
  UserPrismaFormat,
} from "../model/user-model";
import { createJwt } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
const bcrypt = require("bcryptjs");
import multer from 'multer';
import fs from 'fs';
import { redis } from "../application/web";
import { User } from "@prisma/client";

export const prismaUserFormat = {
  id: true,
  username: true,
  full_name: true,
  work_history: true,
  skills: true,
  profile_photo_path: true,
  feeds: {
    select: {
      id: true,
      content: true,
      created_at: true,
      updated_at: true,
    },
  },
  _count: {
    select: {
      connectionsFrom: true,
    },
  },
};

const storage = multer.memoryStorage();
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.') as any, false);
  }
};

const upload = multer({ storage, fileFilter });

export class UserService {
  static formatUserResponse(user: UserPrismaFormat): UserFormat {
    const formattedUser = {
      ...user,
      feeds: user.feeds,
      profile_photo: user.profile_photo_path,
      full_name: user.full_name,
      connection_count: user._count.connectionsFrom,
    };

    return formattedUser;
  }

  static async register(request: CreateUserRequest): Promise<string> {

    try {
      const registerRequest = Validation.validate(
        UserValidation.REGISTER,
        request
      );

    } catch (error: any) {
      console.log(error.flatten())
      throw new ResponseError(400, "Register Error", error.flatten().fieldErrors)
    }

    const totalUserSameUsername = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });

    if (totalUserSameUsername != 0) {
      throw new ResponseError(400, "Username is already taken", { username: "Username is already taken" });
    }

    const totalUserSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (totalUserSameEmail != 0) {
      throw new ResponseError(400, "Email is already registered", { email: "Email is already registered" });
    }

    request.password = await bcrypt.hash(request.password, 10);

    console.log("Register: ", request);

    const user = await prismaClient.user.create({
      data: request,
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: "jobseeker",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    const token = createJwt(payload);


    return token;
  }

  static async getAll(
    userId: number = 0,
    query: string = ""
  ): Promise<UserFormat[]> {
    const cacheKey = "users";
    const cachedUsers = await redis.get(cacheKey);
    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }

    const users = await prismaClient.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
        ...(userId !== 0 && {
          id: {
            not: userId,
          },
        }),
      },
      select: {
        id: true,
        username: true,
        full_name: true,
        profile_photo_path: true,
        connectionsTo: {
          where: {
            from_id: userId,
          },
        },
        connectionRequestsTo: {
          where: {
            from_id: userId,
          },
        },
        rooms_chat_first: {
          where: {
            second_user_id: userId,
          },
          select: {
            id: true,
          },
        },
        rooms_chat_second: {
          where: {
            first_user_id: userId,
          },
          select: {
            id: true,
          },
        },
        connectionRequestsFrom: {
          where: {
            to_id: userId,
          }
        }
      },
    });

    const formattedUsers = users.map((user) => ({
      ...user,
      full_name: user.full_name,
      is_connected: user.connectionsTo.length > 0,
      is_requested: user.connectionRequestsTo.length > 0,
      room_id:
        user.rooms_chat_first.length > 0
          ? user.rooms_chat_first[0].id
          : user.rooms_chat_second.length > 0
            ? user.rooms_chat_second[0].id
            : null,
      profile_photo: user.profile_photo_path,
      got_request: user.connectionRequestsFrom.length > 0,

      rooms_chat_first: undefined,
      rooms_chat_second: undefined,
      profile_photo_path: undefined,
      connectionRequestsTo: undefined,
      connectionsTo: undefined,
    }));

    await redis.set(cacheKey, JSON.stringify(formattedUsers), 'EX', 600);

    return formattedUsers;
  }

  static async get(id: number, currentUserId?: number): Promise<UserFormat> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: prismaUserFormat,
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const isOwner = currentUserId === id;
    const isConnected = await prismaClient.connection.findFirst({
      where: {
        from_id: id,
        to_id: currentUserId,
      },
    });

    const formattedUser = this.formatUserResponse(user);

    const feeds = await prismaClient.feed.findFirst({
      where: {
        user_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!(isOwner || isConnected)) {
      formattedUser.feeds = undefined;
    } else {
      formattedUser.feeds = feeds ? [feeds] : [];
    }

    return formattedUser;
  }

  static async getRecommendations(id: number): Promise<{ name: string; profile_photo: string }[]> {
    const directConnections = await prismaClient.connection.findMany({
      where: {
        from_id: id,
      },
      select: {
        to_id: true,
      },
    });

    const directConnectionIds = directConnections.map(conn => conn.to_id);

    const connectionsOfConnections = await prismaClient.connection.findMany({
      where: {
        from_id: {
          in: directConnectionIds,
        },
      },
      select: {
        to_id: true,
      },
    });

    const recommendedUserIds = connectionsOfConnections.map(conn => conn.to_id);

    const uniqueRecommendedUserIds = [...new Set(recommendedUserIds)].filter(userId =>
      userId !== id && !directConnectionIds.includes(userId)
    );

    const recommendations = await prismaClient.user.findMany({
      where: {
        id: {
          in: uniqueRecommendedUserIds,
        },
      },
      select: {
        id: true,
        full_name: true,
        profile_photo_path: true,
      },
    });

    const formattedRecommendations = recommendations.map(user => ({
      id: user.id,
      name: user.full_name!,
      profile_photo: user.profile_photo_path!,
    }));

    const limitedRecommendations = formattedRecommendations.slice(0, 5);

    if (limitedRecommendations.length < 5) {
      const remainingCount = 5 - limitedRecommendations.length;

      const additionalUsers = await prismaClient.user.findMany({
        where: {
          id: {
            notIn: [...directConnectionIds, id, ...uniqueRecommendedUserIds],
          },
        },
        select: {
          id: true,
          full_name: true,
          profile_photo_path: true,
        },
        take: remainingCount,
      });

      const formattedAdditionalUsers = additionalUsers.map(user => ({
        id: user.id,
        name: user.full_name!,
        profile_photo: user.profile_photo_path!,
      }));

      return [...limitedRecommendations, ...formattedAdditionalUsers];
    }

    return limitedRecommendations;
  }


  static async update(id: number, request: UpdateUserRequest) {

    let url_profile_photo = null;
    let urlDB = "";

    if (request.profile_photo) {
      const file = request.profile_photo;

      const timestamp = Date.now();
      const uploadPath = path.join(__dirname, `../../store/images/profile_${id}_${timestamp}_${path.extname(file.originalname)}`);

      urlDB = `profile_${id}_${timestamp}_${path.extname(file.originalname)}`;
      console.log("Current directory:", process.cwd());
      console.log("Upload: ", uploadPath);
      console.log("URL DB: ", urlDB);

      const dir = path.dirname(uploadPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(uploadPath, file.buffer);

      url_profile_photo = uploadPath;
    }

    const updateData: any = {};
    if (request.username) updateData.username = request.username;
    if (request.name) updateData.full_name = request.name;
    if (request.work_history) updateData.work_history = request.work_history;
    if (request.skills) updateData.skills = request.skills;
    if (url_profile_photo) updateData.profile_photo_path = urlDB;

    try {

      const user = await prismaClient.user.update({
        where: {
          id: id,
        },
        data: updateData,
        select: prismaUserFormat,
      });

      const formattedUser = this.formatUserResponse(user);

      return formattedUser;
    } catch (error) {
      throw new ResponseError(400, "Username is already taken", { username: "Username is already taken" });
    }
  }
}
