import bcrypt from "bcryptjs";
import { HookNextFunction, model, Schema } from "mongoose";
import { IUser, IUserDocument } from "../interfaces/model.interfaces";
import { IUserModel } from "./model.types";

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
  }
);

user.pre("save", async function (this: IUserDocument, next: HookNextFunction) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

user.statics.checkEmail = async function (
  this: IUserModel,
  email: string
): Promise<Boolean> {
  return this.exists({ email });
};

user.statics.checkEmail = async function (this: IUserModel, email: string) {
  return await this.exists({ email });
};

export default model<IUserDocument, IUserModel>("User", user);
