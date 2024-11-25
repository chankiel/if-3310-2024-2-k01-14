import { z, ZodType } from "zod";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ConnectionValidation {
  static readonly STOREREQUEST: ZodType = z
    .object({
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
    })
    .refine((data) => data.from_id !== data.to_id, {
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
      accept: z
        .string()
        .refine((val) => val === "true" || val === "false", {
          message: "Value must be either 'true' or 'false'",
        })
        .transform((val) => val === "true"),
    })
    .and(this.STOREREQUEST);
}

export async function validateConnectionRequestExists(
  from_id: number,
  to_id: number,
  isStore: boolean = false
) {
  const existingRequest = await prismaClient.connectionRequest.findFirst({
    where: {
      from_id,
      to_id,
    },
  });
  if (existingRequest && isStore) {
    throw new ResponseError(409, "Connection request already exists");
  }

  if (!existingRequest && !isStore) {
    throw new ResponseError(404, "Connection request doesnt exists");
  }
}

export async function validateConnectionExists(
  from_id: number,
  to_id: number,
  isStore: boolean = false
) {
  const existingConnection = await prismaClient.connection.findFirst({
    where: {
      from_id,
      to_id,
    },
  });
  if (existingConnection && isStore) {
    throw new ResponseError(409, "Connection already exists");
  }

  if (!existingConnection && !isStore) {
    throw new ResponseError(404, "Connection doesnt exists");
  }
}
