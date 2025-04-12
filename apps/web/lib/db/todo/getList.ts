"use server";

import MongoDBWrapper from "@todo-app/db-driver";
import { Todo } from "../../types";

export async function getList(): Promise<Todo[]> {
  try {
    const todos = await MongoDBWrapper.find<Todo>(
      "todos",
      {}
      // { limit: 10 }
    );
    return todos;
  } catch (err: unknown) {
    console.error("todo add failed:", err);
    throw new Error("Something went wrong!");
  }
}
