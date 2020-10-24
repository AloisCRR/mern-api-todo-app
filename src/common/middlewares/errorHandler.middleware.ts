import { HttpException } from "@common/exceptions/http-exception.filter";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) {
  return res
    .status(error.code)
    .json({ error: error.message, validationErrors: error.validationErrors });
}
