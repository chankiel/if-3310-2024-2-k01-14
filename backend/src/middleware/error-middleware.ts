import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { Prisma } from "@prisma/client";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation Error",
            error: error.flatten()
        });
    } else if(error instanceof ResponseError) {
        res.status(error.status).json({
            success: false,
            message: error.message,
            errors: error.errors
        });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Request error, like unique constraint, not null, etc
        res.status(400).json({
            success: false,
            message: "Prisma Client Request Error",
            error: error.message,
        });
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        // Validation error 
        res.status(400).json({
            success: false,
            message: "Prisma Client Validation Error",
            error: error.message,
        });
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
        res.status(500).json({
            success: false,
            message: "Prisma Client Initialization Error",
            error: error.message,
        });
    }else {
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
            errors: error.message
        })
    }
}