import UserModel from "./schemas/user.schema";
import { IUser } from "./interfaces/user.interface";
import { generateAuthenticationResult } from "@authentication/auth.service";

export async function SignUp(user: IUser, ip: string) {
  await UserModel.emailExists(user.email);
  const userDocument = await UserModel.create(user);
  return generateAuthenticationResult(userDocument, ip);
}

export async function LogIn(
  email: IUser["email"],
  pass: IUser["password"],
  ip: string
) {
  const user = await UserModel.emailExists(email, true);
  await user.comparePassword(pass, user.password);
  return generateAuthenticationResult(user, ip);
}
