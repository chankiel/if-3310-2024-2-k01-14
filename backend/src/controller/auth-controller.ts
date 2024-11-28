import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { LoginUserRequest } from "../model/user-model";
import { UserService, prismaUserFormat } from "../service/user-service";
import { formatResponse } from "../utils/ResponseFormatter";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { AuthService } from "../service/auth-service";

export class AuthController{
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const token = await AuthService.login(request);

            res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                maxAge: 3600000, 
                path: "/", 
            });

            const response = formatResponse<string>(true,token,"User logged in successfully")

            res.status(200).json(
                response
            )
        } catch(e) {
            next(e);
        }
    }

    static async self(req: AuthRequest, res: Response, next: NextFunction) {
        const user = await prismaClient.user.findUnique({
            where:{
                id: req.userId
            },
            select:{
                id: true,
                ...prismaUserFormat
            }
        })

        if(!user){
            throw new ResponseError(
                404,
                "User with the specified id doesn't exist!"
            )
        }

        const formattedUser = UserService.formatUserResponse(user)
        const response = formatResponse(true, formattedUser, "Self data retrieved successfully!" )
        res.status(200).json(response)
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
}