import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  email: string;
  password: string;
  mood?: EMood;
  bornDate?: Date;
}

export enum EMood {
  happy = "happy",
  angry = "angry",
  neutral = "neutral",
  mixed = "mixed",
}

const user = new Schema({
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
});

export default model<IUser>("User", user);
