import { HttpException } from "@common/exceptions/http-exception.filter";
import { IUser, IUserDocument } from "@models/users/interfaces/user.interface";
import UserModel from "@models/users/schemas/user.schema";
import RefreshTokenModel from "@models/refreshToken/schemas/refreshToken.schema";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IAuthenticationResult } from "./interfaces/auth.interfaces";
import { randomTokenString } from "@models/refreshToken/refreshToken.service";

export function generateJwt(user?: IUser) {
  return jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
}

export async function generateRefreshJwt(user: IUser, ip: string) {
  const refreshJwt = await RefreshTokenModel.create({
    user: user.id,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    token: randomTokenString(),
    createdByIp: ip,
  });

  return refreshJwt.token;
}

export async function generateAuthenticationResult(
  userDocument: IUserDocument,
  ip: string
): Promise<IAuthenticationResult> {
  const user = userDocument as IUser;
  const jwt = generateJwt(user);
  const refreshJwt = await generateRefreshJwt(user, ip);
  return { user, jwt, refreshJwt };
}

export async function authenticate(url: string, cookie?: string) {
  if (!cookie) {
    throw new HttpException(
      "You aren't authenticated",
      StatusCodes.UNAUTHORIZED
    );
  }

  const { user } = jwt.verify(cookie, process.env.JWT_SECRET as string, {
    ignoreExpiration: "/user/refresh-token".includes(url),
  }) as {
    user: IUser;
    iat: number;
    exp: number;
  };

  return await UserModel.userExists(user.id);
}
