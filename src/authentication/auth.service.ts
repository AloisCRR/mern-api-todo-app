import { IUser, IUserDocument } from "@models/users/interfaces/user.interface";
import UserModel from "@models/users/schemas/user.schema";
import jwt from "jsonwebtoken";
import { IAuthenticationResult } from "./interfaces/auth.interfaces";

export function generateJwt(user: IUser) {
  return jwt.sign({ user }, process.env.JWT_SECRET as string);
}

export function generateAuthenticationResult(
  userDocument: IUserDocument
): IAuthenticationResult {
  const user = userDocument.toObject() as IUser;
  const jwt = generateJwt(user);
  return { user, jwt };
}

export async function authenticate(cookie?: string) {
  if (!cookie) {
    throw new Error("You aren't authenticated");
  }

  const { user } = jwt.verify(cookie, process.env.JWT_SECRET as string) as {
    user: IUser;
    iat: number;
    exp: number;
  };

  return await UserModel.userExists(user.id);
}
