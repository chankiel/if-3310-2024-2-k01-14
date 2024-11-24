import { Request, Response, NextFunction } from "express";

export interface authRequest extends Request {
    user?: string;
}

export const authMiddleware = async(req: authRequest, res: Response, next: NextFunction) => {
    req.user = "KIEL"
    next()
}