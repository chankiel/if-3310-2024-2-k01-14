import { z, ZodType } from "zod";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
        profile_photo: z
                .instanceof(File)
                .refine((files) => files.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
                .refine(
                    (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
                    "Only .jpg, .jpeg, .png and .webp formats are supported."
                ),
        name: z.string().min(1).max(100),
        work_history: z.string().min(1),
        skills: z.string().min(1)
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