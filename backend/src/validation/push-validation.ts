import { z, ZodType } from "zod";

export class PushValidation {
    static readonly CREATE_PUSH_REQUEST: ZodType = z.object({
        endpoint: z.string(),
        keys: z.object({
            p256dh: z.string().min(1),
            auth: z.string().min(1),
        }),
    });
}