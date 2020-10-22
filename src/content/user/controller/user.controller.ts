import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user.index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, IUserDocument } from "../interfaces/model.interfaces";

declare module "express" {
  interface Request {
    user?: IUserDocument;
  }
}

export interface IAuthRequest extends Request {
  user?: IUserDocument;
}

export interface IAuthenticationResult {
  user: IUser;
  jwt: string;
}

export const generateJwt = async (user: IUser) => {
  return jwt.sign({ user }, process.env.JWT_SECRET as string);
};

export const generateAuthResult = async (
  userDoc: IUserDocument
): Promise<IAuthenticationResult> => {
  const user = userDoc.toObject();
  const jwt = await generateJwt(user);

  return { user, jwt };
};

export const sendAuthResponse = (
  res: Response,
  authResult: IAuthenticationResult,
  isSignup = false
) =>
  res
    .status(isSignup ? StatusCodes.CREATED : StatusCodes.OK)
    .cookie("jwt", authResult.jwt, {
      httpOnly: true,
      secure: false,
    })
    .json(authResult.user);

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (UserModel.checkEmail(req.body.email)) {
      throw new Error("Email already has been taken");
    }

    const newUser = await UserModel.create(req.body);

    const authResult = await generateAuthResult(newUser);

    return sendAuthResponse(res, authResult, true);
  } catch (error) {
    return next(error);
  }
};

export const LogInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordCompare = bcrypt.compare(req.body.password, user.password);

    if (!passwordCompare) {
      throw new Error("Invalid credentials");
    }

    const authResult = await generateAuthResult(user);

    return sendAuthResponse(res, authResult);
  } catch (error) {
    return next(error);
  }
};

export const LogOutUser = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
    });
  } catch (error) {
    return next(error);
  }
};

export const authenticate = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { jwt: jwtCookie } = req.cookies;

  if (!jwtCookie) {
    throw new Error("No estás autenticado");
  }

  const { user } = jwt.verify(jwtCookie, process.env.JWT_SECRET as string) as {
    user: IUser;
    iat: number;
    exp: number;
  };

  const userDocument = await UserModel.findById(user.id);
  if (!userDocument) {
    throw new Error("No estás autenticado");
  }

  req.user = userDocument;
  next();
};

export const GetUser = async (req: Request, res: Response, _: NextFunction) => {
  return res
    .status(req.user ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
    .json(req.user);
};
