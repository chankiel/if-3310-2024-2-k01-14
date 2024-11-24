import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  UserFormat,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { Response } from "express";
const bcrypt = require("bcrypt");
import { User } from "@prisma/client";
import { formatResponse } from "../utils/ResponseFormatter";
import { ApiResponse } from "../model/custom";
const jwt = require("jsonwebtoken");

const prismaUserFormat = {
  username: true,
  description: true,
  photo_profile: true,
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

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

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

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

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

    const formattedUsers = users.map((user)=>({
      ...user,
      relevant_posts: user.feeds,
      feeds: undefined
    }))

    return formattedUsers;
  }

  static async get(id: number): Promise<UserFormat> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: prismaUserFormat
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const formattedUser = {
      ...user,
      relevant_posts: user.feeds,
      feeds: undefined
    }

    return formattedUser
  }

  static async update(
    id: number,
    request: UpdateUserRequest
  ) {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.username) {
    }

    return "User updated successfully";
  }
}
