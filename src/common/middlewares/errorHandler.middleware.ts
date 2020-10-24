import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// TODO Handle errors in more detailed way

export function errorMiddleware(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: error.message });
}
