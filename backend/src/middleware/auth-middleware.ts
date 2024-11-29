import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: number;
  email?: string;
  role?: string;
  iat?: string;
  exp?: string;
}

export const getPayload = (req: AuthRequest) => {
  const token = req.cookies?.token;
  if (!token) {
    return null;
  }
  const payload = verifyJwt(token);
  if (!payload) {
    return null;
  }

  return payload;
};

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const payload = getPayload(req);
  if (!payload) {
    res.status(401).json({ error: "Unauthorized" });
  }else{
      req.userId = payload.userId;
      req.email = payload.email;
      req.role = payload.role;
      req.iat = payload.iat;
      req.exp = payload.exp;
      next();
  }

};
