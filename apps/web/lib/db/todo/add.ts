"use server";

import DbDriver from "@todo-app/db-driver";
import { Todo, TodoUnsaved } from "../../types";
import { mapDbDocObjectIdToString } from "../utils";
import { ObjectId } from 'mongodb';


export async function add({ text }: Pick<Todo, "text">): Promise<Todo> {
  try {
    // await MongoDBWrapper.insertOne<Todo>("todos", {
    const newTodo: TodoUnsaved = {
      // _id: Date.now().toString(),
      text,
      completed: false,
    };

    await DbDriver.insertOne<TodoUnsaved>("todos", newTodo, {});
    // console.log("add server-action saved newTodo:", newTodo);

    // return {
    //   _id: newTodo._id,
    //   text: newTodo.text,
    //   completed: newTodo.completed,
    // };
    const savedTodo: Todo = mapDbDocObjectIdToString(newTodo as TodoUnsaved & {_id: ObjectId});
    // console.log("add server-action mapped savedTodo:", savedTodo);
    return savedTodo;
  } catch (err: unknown) {
    console.error("todo add failed:", err);
    throw new Error("todo add failed");
  }
}
