import bcrypt from "bcryptjs";
import { HookNextFunction, model, Schema } from "mongoose";
import { IUser, IUserDocument } from "../interfaces/user.interface";
import { IUserModel } from "@models/users/interfaces/user.interface";
import { HttpException } from "@common/exceptions/http-exception.filter";
import { StatusCodes } from "http-status-codes";

export enum EMood {
  happy = "happy",
  angry = "angry",
  neutral = "neutral",
  mixed = "mixed",
}

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      match: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    mood: {
      type: String,
      enum: Object.values(EMood),
      default: EMood.neutral,
    },
    bornDate: {
      type: Date,
    },
  },
  {
    id: true,
    toObject: {
      virtuals: true,
      transform: (_: IUserDocument, obj: IUser) => ({
        ...obj,
        password: undefined,
        _id: undefined,
        __v: undefined,
      }),
    },
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

user.pre<IUserDocument>("save", async function (next: HookNextFunction) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

user.statics.emailExists = async function (
  this: IUserModel,
  email: IUser["email"],
  login = false
) {
  const user = await this.findOne({ email });

  if (user && !login) {
    throw new HttpException("Mail already in use", StatusCodes.BAD_REQUEST);
  }

  if (!user && login) {
    throw new HttpException("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  return user;
};

user.statics.userExists = async function (this: IUserModel, _id: string) {
  const user = await this.findOne({ _id });

  if (!user) {
    throw new HttpException(
      "You aren't authenticated",
      StatusCodes.UNAUTHORIZED
    );
  }

  return user;
};

user.methods.comparePassword = async function (
  pass: string,
  userPass: IUserDocument["password"]
) {
  if (!(await bcrypt.compare(pass, userPass))) {
    throw new HttpException("Invalid credentials", StatusCodes.BAD_REQUEST);
  }
  return;
};

export default model<IUserDocument, IUserModel>("User", user);
