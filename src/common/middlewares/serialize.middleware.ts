import { HttpException } from "@common/exceptions/http-exception.filter";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";

export function serializer(
  schema: ObjectSchema,
  propertyToValidate: "body" | "query" | "params"
) {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.validate(req[propertyToValidate], {
      abortEarly: false,
    });

    if (result.error) {
      const errors = result.error.details.reduce((prev, current) => {
        prev[current.path[0]] = current.message;
        return prev;
      }, {} as { [key: string]: string });

      throw new HttpException(
        "Validation errors",
        StatusCodes.BAD_REQUEST,
        errors
      );
    }

    next();
  };
}
