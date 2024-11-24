import { z, ZodType } from "zod";

export class ConnectionValidation {
  static readonly STOREREQUEST: ZodType = z.object({
    from_id: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Request Sender Id must be a valid number",
      }),
    to_id: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Request Receiver Id must be a valid number",
      }),
  }).refine((data) => data.from_id !== data.to_id, {
    message: "Sender and Receiver Id must be different",
  });

  static readonly INDEXREQUEST: ZodType = z.object({
    user_id: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "User has have a valid number Id",
      }),
  });

  static readonly RESPONDREQ: ZodType = z
    .object({
      accept: z.boolean(),
    })
    .and(this.STOREREQUEST);
}
