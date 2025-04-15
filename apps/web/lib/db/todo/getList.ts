"use server";

import DbDriver from "@todo-app/db-driver";
import { DBTodo, Todo } from "../../types";
import { mapDbDocsObjectIdToString } from "../utils";

export async function getList(): Promise<Todo[]> {
  try {
    const todos: DBTodo[] = await DbDriver.find<DBTodo>(
      "todos",
      {},
      { limit: 12 }
    );

    const mappedTodos: Todo[] = mapDbDocsObjectIdToString(todos);
    // console.log("mappedTodos:", mappedTodos);
    return mappedTodos;
  } catch (err: unknown) {
    console.error("todo add failed:", err);
    throw new Error("Something went wrong!");
  }
}
