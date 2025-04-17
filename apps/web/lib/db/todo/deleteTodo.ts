"use server";

import DbDriver from "@todo-app/db-driver";

export async function deleteTodoapp(id: string): Promise<void> {
  try {
    await DbDriver.connect();
    await DbDriver.deleteOne("todos", {
      _id: new ObjectId(id),
    });
  } catch (err) {
    console.error("todo delete failed:", err);
    throw new Error("Failed to delete todo");
  }
}
