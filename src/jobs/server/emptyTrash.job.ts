import todoSchema, { EStatus } from "@models/todos/schemas/todo.schema";

export default async function emptyTrash() {
  try {
    await todoSchema.deleteMany({
      status: EStatus.Trash,
      movedDate: {
        $lte: new Date(Date.now() - 1000 * 3600 * 168),
      },
    });
  } catch (error) {
    console.error(error);
  }
}
