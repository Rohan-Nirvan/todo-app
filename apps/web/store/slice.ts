import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../lib/types"; // make sure this points to correct Todo type

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    toggleTodoComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, toggleTodoComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
