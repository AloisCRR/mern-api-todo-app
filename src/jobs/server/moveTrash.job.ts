import todoSchema, { EStatus } from "@models/todos/schemas/todo.schema";

export default async function moveToTrash() {
  try {
    await todoSchema.updateMany(
      {
        status: EStatus.Completed,
        movedDate: {
          $lte: new Date(Date.now() - 1000 * 3600 * 72),
        },
      },
      { status: EStatus.Trash }
    );
  } catch (error) {
    console.error(error);
  }
}
