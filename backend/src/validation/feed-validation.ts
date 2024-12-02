import { z, ZodType } from "zod";

export class FeedValidation {

    static readonly ADD: ZodType = z.object({
        content: z.string().min(1),
        
    })

}