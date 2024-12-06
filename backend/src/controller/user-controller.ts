import { Request, Response, NextFunction } from "express";
import { AuthRequest, getPayload } from "../middleware/auth-middleware";
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

    static async index(req: Request, res: Response, next: NextFunction) {
        try{
            const query = typeof req.query.q === 'string' ? req.query.q : "";

            const userId = getPayload(req)?.userId

            const users = await UserService.getAll(userId,query)
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

            console.log(response)
            
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.user_id);
            const request: UpdateUserRequest = {
                username: req.body.username,
                name: req.body.name,
                work_history: req.body.work_history,
                skills: req.body.skills,
                profile_photo: req.file
            };

            console.log("Request data:", request);
    
            const response = await UserService.update(userId, request);
            
            res.status(200).json({
                response
            })
        } catch(e) {
            next(e);
        }
    }

    // static async self(req: AuthRequest,)
}