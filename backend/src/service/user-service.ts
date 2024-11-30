import path from "path";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  UserFormat,
  UserPrismaFormat,
} from "../model/user-model";
import { createJwt } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const prismaUserFormat = {
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

export class UserService {
  static formatUserResponse(user: UserPrismaFormat): UserFormat {
    const formattedUser = {
      ...user,
      relevant_posts: user.feeds,
      profile_photo: user.profile_photo_path,
      name: user.full_name,
      connection_count: user._count.connectionsFrom,

      _count: undefined,
      feeds: undefined,
      profile_photo_path: undefined,
      full_name: undefined,
    };

    return formattedUser;
  }

  static async register(request: CreateUserRequest): Promise<string> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserSameUsername != 0) {
      throw new ResponseError(400, "Username is already taken");
    }

    const totalUserSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserSameEmail != 0) {
      throw new ResponseError(400, "Email is already registered");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    console.log("Register: ", registerRequest);

    const user = await prismaClient.user.create({
      data: registerRequest,
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
    const select_query = {
      id: true,
      username: true,
      full_name: true,
      profile_photo_path: true,
      connectionsTo: userId
        ? {
            where: {
              from_id: userId,
            },
          }
        : undefined,
      connectionRequestsTo: userId
        ? {
            where: {
              from_id: userId,
            },
          }
        : undefined,
    };

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
      select: select_query,
    });

    const formattedUsers = users.map((user) => ({
      ...user,
      name: user.full_name,
      is_connected: user.connectionsTo.length > 0,
      is_requested: user.connectionRequestsTo.length > 0,
      profile_photo: user.profile_photo_path,
      
      profile_photo_path: undefined,
      connectionRequestsTo: undefined,
      connectionsTo: undefined,
      full_name: undefined,
    }));

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
        from_id: currentUserId,
        to_id: id,
      },
    });

    const formattedUser = this.formatUserResponse(user);

    const latestPost = await prismaClient.feed.findFirst({
      where: {
        user_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log(latestPost);

    if (!(isOwner && isConnected)) {
      formattedUser.relevant_posts = undefined;
    } else {
      formattedUser.relevant_posts = latestPost ? [latestPost] : [];
    }

    return formattedUser;
  }

  static async update(id: number, request: UpdateUserRequest) {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    let url_profile_photo = null;

    if (updateRequest.profile_photo) {
      const file = updateRequest.profile_photo;

      const uploadPath = path.join(__dirname, `./public/image/profile_${id}`);

      // download the image to local

      url_profile_photo = uploadPath;
    }

    await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        username: updateRequest.username,
        full_name: updateRequest.name,
        work_history: updateRequest.work_history,
        skills: updateRequest.skills,
        profile_photo_path: url_profile_photo,
      },
      select: prismaUserFormat,
    });

    return "User updated successfully";
  }
}
