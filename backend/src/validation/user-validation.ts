import { z, ZodType } from "zod";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class UserValidation {

    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().min(1),
        full_name: z.string().min(1).max(100),
        password: z.string().min(6).max(100),
    });
    
    static readonly LOGIN : ZodType = z.object({
        identifier: z.string().min(1),
        password: z.string().min(6).max(100),
    });

    static readonly UPDATE : ZodType = z.object({
        username: z.string().min(1),
        description: z.string().min(6).max(100),
        photo_profile: z.string().min(1).max(100)
    });
}

export async function validateUserExists(user_id: number, isStore: boolean) {
    const user = await prismaClient.user.findUnique({
        where: { id: user_id }
    });
    if (!user && !isStore) {
        throw new ResponseError(404,`User with id ${user_id} not found`);
    }

    if (user && isStore) {
        throw new ResponseError(409,`User with id ${user_id} already exists!`);
    }
}