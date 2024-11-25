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
    req.userId = 1
    req.email = "user@gmail.com"
    req.role = "jobseeker"
    req.iat = "1683038371"
    req.exp = "1683041971"
    next()
}

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = verifyJwt(token);
    if (!payload) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Menyimpan informasi user ke dalam request
    (req as any).user = payload;
    next();
}