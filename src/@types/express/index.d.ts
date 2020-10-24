import { IUserDocument } from "@models/users/interfaces/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserDocument;
    }
  }
}
