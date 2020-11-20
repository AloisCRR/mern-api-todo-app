import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authenticate } from "./auth.service";
import { IAuthenticationResult } from "./interfaces/auth.interfaces";

export async function checkAuth(req: Request, _: Response, next: NextFunction) {
  try {
    req.user = await authenticate(req.originalUrl, req.cookies["jwt"]);
    return next();
  } catch (error) {
    return next(error);
  }
}

export function sendAuthResponse(
  res: Response,
  authResult: IAuthenticationResult,
  isSignUp = false
) {
  return res
    .status(isSignUp ? StatusCodes.CREATED : StatusCodes.OK)
    .cookie("jwt", authResult.jwt, {
      httpOnly: true,
      secure: false,
    })
    .cookie("refreshJwt", authResult.refreshJwt, {
      httpOnly: true,
      secure: false,
    })
    .json(authResult.user);
}
