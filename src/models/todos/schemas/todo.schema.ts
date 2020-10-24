import { HookNextFunction, model, Query, Schema, Types } from "mongoose";
import { ITodo, ITodoDocument, ITodoModel } from "../interfaces/todo.interface";

export enum EStatus {
  Pending = "pending",
  Completed = "completed",
  Trash = "trash",
}

const todoSchema = new Schema(
  {
    body: {
      type: String,
      maxlength: 500,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EStatus),
      default: EStatus.Pending,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    movedDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    id: true,
    toObject: {
      virtuals: true,
      transform: (_: ITodoDocument, obj: ITodo) => ({
        ...obj,
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

todoSchema.index({ body: "text" });

todoSchema.pre<Query<ITodoDocument> & { _update: ITodoDocument }>(
  "findOneAndUpdate",
  function (next: HookNextFunction) {
    if (this._update.status) {
      this._update.movedDate = new Date();
    }

    next();
  }
);

export default model<ITodoDocument, ITodoModel>("Todo", todoSchema);
