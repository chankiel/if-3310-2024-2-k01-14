import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  LoginUserRequest,
} from "../model/user-model";
import { createJwt } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { errorMiddleware } from "../middleware/error-middleware";
const bcrypt = require("bcryptjs");

export class AuthService {
  static async login(request: LoginUserRequest): Promise<string> {
    // console.log(request)
    try {
      const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    } catch (error : any) {
      console.log(error.flatten())
      throw new ResponseError(400, "Login Error", error.flatten().fieldErrors)
    }

    let user = await prismaClient.user.findFirst({
      where: {
        OR: [
          { email: request.identifier },
          { username: request.identifier },
        ],
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username is wrong", {identifier: "Username/Email is not Found"});
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Password is wrong", {password: "Password is wrong"});
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: "jobseeker",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // TTL 1 jam
    };

    // Buat JWT
    const token = createJwt(payload);

    return token;
  }
}
