import { ITodo } from "./interfaces/todo.interface";
import todoSchema from "./schemas/todo.schema";

export async function CreateTodo(todo: ITodo) {
  return await todoSchema.create(todo);
}
