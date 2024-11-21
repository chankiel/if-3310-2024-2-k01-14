import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, toGetUserProfileResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { Response } from "express";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

export class UserService {

    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserSameUsername = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if(totalUserSameUsername != 0) {
            throw new ResponseError(400, "Username already exist");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        return toUserResponse("User registered successfully", token);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if(!user) {
            throw new ResponseError(401, "Username or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if(!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        return toUserResponse("User logged in successfully", token);
    }

    static async get(id: number): Promise<UserResponse> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
            include: {
                feeds: true,
            }
        })

        if(!user) {
            throw new ResponseError(404, "User not found");
        }

        const relevantPosts = user.feeds.map(feed => ({
            id: feed.id,
            content: feed.content,
            createdAt: feed.created_at,
            updatedAt: feed.updated_at
        }));

        return toGetUserProfileResponse("User profile retrieved successfully", user.username, user.description!, user.photo_profile!, relevantPosts);
    }

}