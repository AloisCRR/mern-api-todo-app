import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function userSerializer(
  schema: ObjectSchema,
  propertyToValidate: "body" | "query" | "params"
) {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.validate(req[propertyToValidate], {
      abortEarly: false,
    });

    if (result.error) {
      console.log(result.error);
      throw new Error("Validation errors");
    }

    next();
  };
}
