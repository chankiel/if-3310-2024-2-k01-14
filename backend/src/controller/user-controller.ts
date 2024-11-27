import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserFormat } from "../model/user-model";
import { UserService } from "../service/user-service";
import { formatResponse } from "../utils/ResponseFormatter";

export class UserController {
    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const token = await UserService.register(request);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                path: "/",
            });
            
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

            res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                maxAge: 3600000, 
                path: "/", 
            });

            const response = formatResponse<string>(true,token,"User logged in successfully")

            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    static async index(req: AuthRequest, res: Response, next: NextFunction) {
        try{
            const query = typeof req.query.q === 'string' ? req.query.q : "";
            const users = await UserService.getAll(query)
            const response = formatResponse<UserFormat[]>(true,users,"Users retrieved successfully")

            res.status(200).json(response)
        }catch(e){
            next(e);
        }
    }

    static async show(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.user_id);
            const user = await UserService.get(userId);
            const response = formatResponse(true,user,"User retrieved successfully!")
            
            res.status(200).json(response)
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

    static async logout(req: Request, res: Response, next: NextFunction){
        try {    
            res.clearCookie("token", {
                httpOnly: true, 
                secure: true,
                path: "/", 
            });
            const response = formatResponse<string>(true,"","User logged out successfully")

            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }


    // static async self(req: AuthRequest,)
}