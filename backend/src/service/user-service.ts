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

const prismaUserFormat = {
  full_name: true,
  work_history: true,
  skills: true,
  profile_photo_path: true,
  connection_count: true,
  feeds: {
    select: {
      id: true,
      content: true,
      created_at: true,
      updated_at: true,
    },
  },
};

export class UserService {
  static formatUserResponse(user: UserPrismaFormat){
    const formattedUser = {
      ...user,
      relevant_posts: user.feeds,
      profile_photo: user.profile_photo_path,
      name: user.full_name,

      feeds: undefined,
      profile_photo_path: undefined,
      full_name: undefined,
      work_history: user.work_history,
      skills: user.skills,
      connection_count: 0
    };

    return formattedUser
  };

  static async register(request: CreateUserRequest): Promise<string> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserSameUsername = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserSameUsername != 0) {
      throw new ResponseError(400, "Username already exist");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    console.log("Regitser: ", registerRequest)
    
    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    const payload = {
        userId: user.id,
        email: user.email,
        role: "jobseeker",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // TTL 1 jam
    };

    // Buat JWT
    const token = createJwt(payload);

    return token;
  }

  static async login(request: LoginUserRequest): Promise<string> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const payload = {
        userId: user.id,
        email: user.email,
        role: "jobseeker",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // TTL 1 jam
    };

    // Buat JWT
    const token = createJwt(payload);

      return token;
    }

  static async getAll(query: string = ""): Promise<UserFormat[]> {
    const users = await prismaClient.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: prismaUserFormat,
    });

    const formattedUsers = users.map((user) => (this.formatUserResponse(user)));

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

    const connectionCount = await prismaClient.connection.count({
      where: {
        OR: [
          {
            from_id: id
          },
          {
            to_id: id
          }
        ],
      }
    });

    const isOwner = currentUserId === id;
    const isConnected = await prismaClient.connection.findFirst({
      where: {
        OR: [
          { 
            from_id: currentUserId, 
            to_id: id 
          },
          { 
            from_id: id, 
            to_id: currentUserId 
          },
        ],
      },
    });

    const formattedUser = this.formatUserResponse(user);

    formattedUser.connection_count = connectionCount;

    if(isOwner || isConnected) {
      formattedUser.relevant_posts = user.feeds;
    }

    return formattedUser;
  }

  static async update(id: number, request: UpdateUserRequest) {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    await prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        username: updateRequest.username,
        full_name: updateRequest.name,
        work_history: updateRequest.work_history,
        skills: updateRequest.skills,
        profile_photo_path: updateRequest.photo_profile,
      }
    });

    return "User updated successfully";
  }
}
