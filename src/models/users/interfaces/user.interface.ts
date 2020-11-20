import { Document, Model } from "mongoose";
import { EMood } from "../schemas/user.schema";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  mood?: EMood;
  bornDate?: Date;
  lang: string;
  timestamps: {
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export interface IUserDocument extends IUser, Document {
  id: IUser["id"];
  comparePassword(
    pass: string,
    userPass: IUserDocument["password"]
  ): Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  emailExists(email: IUser["email"], login?: boolean): Promise<IUserDocument>;
  userExists(_id?: IUser["id"]): Promise<IUserDocument>;
}
