import { Request, Response, NextFunction } from "express";
import { authRequest } from "../middleware/auth-middleware";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserFormat } from "../model/user-model";
import { UserService } from "../service/user-service";
import { User } from "@prisma/client";
import { formatResponse } from "../utils/ResponseFormatter";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const token = await UserService.register(request);
            
            const response = formatResponse<string>(true,token,"User Registered Successfully")

            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const token = await UserService.login(request);
            const response = formatResponse<string>(true,token,"User logged in successfully")

            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    static async getAll(req: authRequest, res: Response, next: NextFunction) {
        try{
            const users = await UserService.getAll(req.params.query)
            const response = formatResponse<UserFormat[]>(true,users,"Users retrieved successfully")

            res.status(200).json(response)
        }catch(e){
            next(e);
        }
    }

    static async get(req: authRequest, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.user_id);
            const response = await UserService.get(userId);
            
            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.user_id);
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response = await UserService.update(userId, request);
            
            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

}