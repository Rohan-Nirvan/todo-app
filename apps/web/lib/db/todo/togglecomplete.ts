"use server";

import DbDriver from "@todo-app/db-driver";

export async function toggleTodoCompleteapp(
  id: string,
  currentStatus: boolean
): Promise<void> {
  try {
    await DbDriver.connect();
    await DbDriver.updateOne(
      "todos",
      { _id: id },
      { $set: { completed: !currentStatus } }
    );
  } catch (err) {
    console.error("toggle complete failed:", err);
    throw new Error("Failed to update todo status");
  }
}
