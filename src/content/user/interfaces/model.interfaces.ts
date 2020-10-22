import { Document, Model } from "mongoose";
import { EMood } from "../model/user.model";

export interface IUser extends Document {
  id: string;
  firstName: string;
  email: string;
  password: string;
  mood?: EMood;
  bornDate?: Date;
}

export interface IUserDocument extends IUser, Document {
  id: string;
}

export interface IUserModel extends Model<IUserDocument> {
  checkEmail(email: string): Promise<Boolean>;
}
