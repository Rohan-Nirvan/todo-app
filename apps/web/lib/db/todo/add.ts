"use server";

import MongoDBWrapper from "@todo-app/db-driver";
import { Todo } from "../../types";

export async function add({ text }: Pick<Todo, "text">) {
  try {
    await MongoDBWrapper.insertOne<Todo>("todos", {
      id: Date.now().toString(),
      text,
      completed: false,
    });
    return "success";
  } catch (err: unknown) {
    console.error("todo add failed:", err);
  }
}
