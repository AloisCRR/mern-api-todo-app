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
      skipFunctions: true,
      stripUnknown: true,
    });

    if (result.error) {
      const errors = result.error.details.reduce((prev, current) => {
        prev[current.path[0]] = current.message;
        return prev;
      }, {} as Record<string, string>);

      throw new HttpException(
        "Validation errors",
        StatusCodes.BAD_REQUEST,
        errors
      );
    }

    next();
  };
}
