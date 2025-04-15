import { ObjectId } from 'mongodb';

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export type TodoUnsaved = Omit<Todo, '_id'>

export type DBTodo = Todo & {_id: ObjectId}