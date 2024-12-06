import { z, ZodType } from "zod";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().min(1),
        full_name: z.string().min(1).max(100),
        password: z.string().min(6).max(100),
    });

    static readonly LOGIN: ZodType = z.object({
        identifier: z.string().min(1),
        password: z.string().min(6).max(100),
    });

    static readonly UPDATE: ZodType = z.object({
        username: z.string().min(1).optional(),
        profile_photo: z
        .object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string().refine((type) => type.startsWith("image/"), {
                message: "File must be an image.",
            }),
            buffer: z.instanceof(Buffer),
            size: z.number().max(MAX_FILE_SIZE),
        })
        .optional(),
        name: z.string().min(1).max(100).optional(),
        work_history: z.string().min(1).optional(),
        skills: z.string().min(1).optional()
    });
}

export async function validateUserExists(user_id: number, isStore: boolean) {
    const user = await prismaClient.user.findUnique({
        where: { id: user_id }
    });
    if (!user && !isStore) {
        throw new ResponseError(404, `User with id ${user_id} not found`);
    }

    if (user && isStore) {
        throw new ResponseError(409, `User with id ${user_id} already exists!`);
    }
}