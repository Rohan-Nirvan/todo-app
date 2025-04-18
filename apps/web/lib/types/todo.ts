import { ObjectId } from "mongodb";

export enum Priority {
  High = "high",
  Medium = "medium",
  Low = "low",
}

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  priority: Priority;


  // priority: "high" | "medium" | "low"; // for priority task
  targetdate: string; //for date task
}

export type TodoUnsaved = Omit<Todo, "_id">;

export type DBTodo = Todo & { _id: ObjectId };
