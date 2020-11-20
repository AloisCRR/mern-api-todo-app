import { IUser } from "@models/users/interfaces/user.interface";
import { Document, Model } from "mongoose";
import { EStatus } from "../schemas/todo.schema";

export interface ITodo {
  id: string;
  body: string;
  user: IUser["id"];
  status: EStatus;
  movedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoDocument extends ITodo, Document {
  id: string;
}

export interface ITodoModel extends Model<ITodoDocument> {}
