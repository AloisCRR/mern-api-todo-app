import { Document, Model } from "mongoose";

export interface IRefreshToken {
  id?: string;
  user: string;
  token: string;
  expires: number;
  createdByIp: string;
  revoked?: Date;
  revokedByIp?: string;
  replacedByToken?: string;
}

export interface IRefreshTokenDocument extends IRefreshToken, Document {
  id: IRefreshToken["id"];
  isExpired?: boolean;
  isActive?: boolean;
}

export interface IRefreshTokenModel
  extends IRefreshToken,
    Model<IRefreshTokenDocument> {
  validateRefreshToken(
    ip: string,
    token?: IRefreshToken["token"]
  ): Promise<IRefreshTokenDocument>;
  revokeToken(token: IRefreshToken["token"], ip: string): Promise<void>;
  getRefreshToken(
    token: IRefreshToken["token"]
  ): Promise<IRefreshTokenDocument | null>;
}
