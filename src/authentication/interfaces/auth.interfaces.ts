import { IUser, IUserDocument } from "@models/users/interfaces/user.interface";
import { Request } from "express";

export interface IAuthenticationResult {
  user: IUser;
  jwt: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IUserDocument;
}
