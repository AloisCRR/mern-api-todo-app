import Joi from "joi";
import { EMood } from "../schemas/user.schema";

export const userBody = Joi.object({
  name: Joi.string().empty().trim().min(2).max(40).required().messages({
    "string.base": "name must be a string",
    "string.empty": "email cannot be empty string",
    "string.min": "name must have at least 2 characters",
    "string.max": "name must have 40 characters maximum",
    "any.required": "name is a required value",
  }),
  email: Joi.string()
    .empty()
    .trim()
    .regex(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    .required()
    .messages({
      "string.base": "email must be a string",
      "string.empty": "email cannot be empty string",
      "object.regex": "invalid email",
      "string.pattern.base": "invalid email",
      "any.required": "email is a required value",
    }),
  password: Joi.string().empty().trim().min(4).required().messages({
    "string.base": "password must be a string",
    "string.empty": "password cannot be empty string",
    "string.min": "password must have at least 4 characters",
    "any.required": "password is a required value",
  }),
  mood: Joi.valid(...Object.values(EMood)),
  bornDate: Joi.date().iso(),
});

export const userLogIn = Joi.object({
  email: Joi.string()
    .empty()
    .trim()
    .regex(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    .required()
    .messages({
      "string.base": "email must be a string",
      "string.empty": "email cannot be empty string",
      "object.regex": "invalid email",
      "string.pattern.base": "invalid email",
      "any.required": "email is a required value",
    }),
  password: Joi.string().empty().trim().min(4).required().messages({
    "string.base": "password must be a string",
    "string.empty": "password cannot be empty string",
    "string.min": "password must have at least 4 characters",
    "any.required": "password is a required value",
  }),
});
