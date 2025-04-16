import { ObjectId } from "mongodb";

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low"; // for priority task
  targetdate: string; //for date task
}

export type TodoUnsaved = Omit<Todo, "_id">;

export type DBTodo = Todo & { _id: ObjectId };
