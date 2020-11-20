import crypto from "crypto";
import { IRefreshToken } from "./interfaces/refreshTokens.interface";
import RefreshJwtModel from "@models/refreshToken/schemas/refreshToken.schema";
import UserModel from "@models/users/schemas/user.schema";
import { IUser } from "@models/users/interfaces/user.interface";
import { generateJwt } from "@authentication/auth.service";

export function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

export async function refreshJwt(
  ip: string,
  user?: IUser,
  token?: IRefreshToken["token"]
) {
  await UserModel.userExists(user?.id);

  await RefreshJwtModel.validateRefreshToken(ip, token);

  return generateJwt(user);
}

export async function revokeRefreshJwt(
  ip: string,
  token?: IRefreshToken["token"]
) {
  const refreshToken = await RefreshJwtModel.validateRefreshToken(ip, token);

  await RefreshJwtModel.findByIdAndUpdate(refreshToken._id, {
    revoked: new Date(),
  });
}
