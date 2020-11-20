import { HttpException } from "@common/exceptions/http-exception.filter";
import { MongooseSchemaDefinition } from "@common/types/mongooseSchema.type";
import { StatusCodes } from "http-status-codes";
import { Document, model, Schema } from "mongoose";
import {
  IRefreshToken,
  IRefreshTokenDocument,
  IRefreshTokenModel,
} from "../interfaces/refreshTokens.interface";

const schemaDefinition: MongooseSchemaDefinition<IRefreshToken> = {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expires: Number,
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
};

const refreshToken = new Schema(schemaDefinition, {
  id: true,
  toJSON: {
    versionKey: false,
    transform: (
      _: IRefreshTokenDocument,
      ret: Partial<IRefreshToken & Document>
    ) => {
      Object.keys(ret).forEach((key) => {
        if (key != "token") {
          delete ret[key as keyof Partial<IRefreshToken & Document>];
        }
      });
    },
  },
  timestamps: true,
});

refreshToken.virtual("isExpired").get(function (this: IRefreshTokenDocument) {
  return Date.now() >= this.expires;
});

refreshToken.virtual("isActive").get(function (this: IRefreshTokenDocument) {
  return !this.revoked && !this.isExpired;
});

refreshToken.statics.validateRefreshToken = async function (
  this: IRefreshTokenModel,
  ip: string,
  token?: IRefreshToken["token"]
) {
  const refreshToken = await this.findOne({
    token,
    createdByIp: ip,
  });

  if (!refreshToken) {
    throw new HttpException("Token doesn't exists", StatusCodes.FORBIDDEN);
  }

  if (!refreshToken.isActive) {
    throw new HttpException("Token isn't active", StatusCodes.FORBIDDEN);
  }

  return refreshToken;
};

refreshToken.statics.revokeToken = async function (
  this: IRefreshTokenModel,
  token: IRefreshToken["token"],
  ip: string
) {
  this.validateRefreshToken(token);

  await this.findOneAndUpdate(
    { token },
    {
      revoked: new Date(),
      revokedByIp: ip,
    }
  );

  return;
};

refreshToken.statics.getRefreshToken = async function (
  this: IRefreshTokenModel,
  token: IRefreshToken["token"]
) {
  this.validateRefreshToken(token);

  return await this.findOne({ token });
};

export default model<IRefreshTokenDocument, IRefreshTokenModel>(
  "RefreshToken",
  refreshToken
);
