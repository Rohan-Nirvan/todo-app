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
  },
});

export const { setTodos, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
