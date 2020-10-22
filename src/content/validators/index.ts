import { NextFunction, Request, Response } from "express";
import joi, { ObjectSchema } from "joi";

export const validateSignUp = joi.object({
  name: joi.string().alphanum().min(2).max(50).required().messages({
    "string.min": "User must contain minimun 2 characters",
  }),
  email: joi
    .string()
    .regex(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    .trim()
    .required(),
  password: joi.string().min(8).max(60).required(),
  bornDate: joi.date() /* .validate((value: string) => ) */,
});

export default (
  schema: ObjectSchema,
  propertyToValidate: "body" | "query" | "params"
) => (req: Request, _: Response, next: NextFunction) => {
  const res = schema.validate(req[propertyToValidate], { abortEarly: false });

  if (res.error) {
    const errors: { [key: string]: string } = {};

    errors["hola"] = "Error";

    // TODO throw new Error(errors)
  }

  next();
};
