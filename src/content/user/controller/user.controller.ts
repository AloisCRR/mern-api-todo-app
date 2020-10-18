import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user.index";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.create(req.body);

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};

export const GetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.params.id);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const DeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};
