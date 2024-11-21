import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);
            
            res.cookie("token", response.body?.token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000
            })
            
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
            const response = await UserService.login(request);
            
            res.cookie("token", response.body?.token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000
            })
            
            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
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

}