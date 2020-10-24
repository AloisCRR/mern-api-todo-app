import { checkAuth } from "@authentication/auth.controller";
import { serializer } from "@common/middlewares/serialize.middleware";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ITodo } from "./interfaces/todo.interface";
import { todoBody } from "./serializers/todo.serializer";
import { CreateTodo } from "./todos.service";

export async function handleCreateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoBody = {
      ...req.body,
      user: req.user?.id,
    } as ITodo;

    const todoDocument = await CreateTodo(todoBody);

    return res.status(StatusCodes.CREATED).json(todoDocument.toObject());
  } catch (error) {
    return next(error);
  }
}

const router = Router();

router.post("/new", serializer(todoBody, "body"), checkAuth, handleCreateTodo);

export default router;
