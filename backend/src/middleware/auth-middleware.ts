import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    userId?: number;
    email?: string;
    role?: string;
    iat?: string;
    exp?: string;
}

export const authMiddleware = async(req: AuthRequest, res: Response, next: NextFunction) => {
    req.userId = 1
    req.email = "user@gmail.com"
    req.role = "jobseeker"
    req.iat = "1683038371"
    req.exp = "1683041971"
    next()
}