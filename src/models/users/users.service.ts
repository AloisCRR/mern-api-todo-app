import UserModel from "./schemas/user.schema";
import { IUser } from "./interfaces/user.interface";
import { generateAuthenticationResult } from "@authentication/auth.service";

export async function SignUp(user: IUser) {
  await UserModel.emailExists(user.email);
  const userDocument = await UserModel.create(user);
  return generateAuthenticationResult(userDocument);
}

export async function LogIn(email: IUser["email"], pass: IUser["password"]) {
  const user = await UserModel.emailExists(email, true);
  await user.comparePassword(pass, user.password);
  return generateAuthenticationResult(user);
}
