import { z, ZodType } from "zod";

export class UserValidation {

    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().min(1),
        password: z.string().min(6).max(100),
    });
    
    static readonly LOGIN : ZodType = z.object({
        email: z.string().min(1),
        password: z.string().min(6).max(100),
    });

    static readonly UPDATE : ZodType = z.object({
        username: z.string().min(1),
        description: z.string().min(6).max(100),
        photo_profile: z.string().min(1).max(100)
    });
}