import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request {
    userId?: number;
    email?: string;
    role?: string;
    iat?: string;
    exp?: string;
}

export const authMiddleware = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
    }else{
        const payload = verifyJwt(token);
        if (!payload) {
            res.status(401).json({ error: "Invalid or expired token" });
        }else{
            req.userId = payload!.userId
            req.email = payload!.email
            req.role = payload!.role
            req.iat = payload!.iat
            req.exp = payload!.exp
            next()
        }
        
    }

}