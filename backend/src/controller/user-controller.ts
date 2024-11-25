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
                httpOnly: false,
                secure: false,
                maxAge: 3600000,
                path: "/",
            });
            
            console.log("Cookies: ", req.cookies);
            
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
                httpOnly: true, // Mencegah akses melalui JavaScript (keamanan tambahan)
                secure: true, // Hanya digunakan untuk HTTPS
                maxAge: 3600 * 1000, // Masa berlaku cookie: 1 jam
                path: "/", // Cookie berlaku di semua rute
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