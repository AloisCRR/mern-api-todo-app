import Joi from "joi";
import { EStatus } from "../schemas/todo.schema";

export const todoBody = Joi.object({
  body: Joi.string().trim().required().messages({
    "string.base": "body must be a string",
    "string.empty": "body cannot be empty string",
    "string.max": "body must have 500 characters maximum",
    "any.required": "body is a required value",
  }),
  status: Joi.valid(...Object.values(EStatus)).messages({
    "any.only": "Available values are 'pending', 'completed', 'trash'",
  }),
}).messages({
  "object.unknown": "Any other property isn't allowed",
});
