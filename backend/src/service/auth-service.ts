import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  LoginUserRequest,
} from "../model/user-model";
import { createJwt } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
const bcrypt = require("bcrypt");

export class AuthService {
  static async login(request: LoginUserRequest): Promise<string> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findFirst({
      where: {
        OR: [
          { email: loginRequest.identifier },
          { username: loginRequest.identifier },
        ],
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
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
