"use client";

import { useEffect } from "react";
import { getList, Todo } from "../../../lib";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTodos, TodoState } from "../../../store/slice";
import { deleteTodo, toggleTodoComplete } from "../../../store/slice";

export default function TodoList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initList() {
      const todos: Todo[] = await getList();
      // console.log("fetched todos:", todos);
      dispatch(setTodos(todos));
    }
    initList();
  }, [dispatch]);

  const list: Todo[] = useAppSelector((state: TodoState) => state.todos);

  const handleCheckboxChange = (id: string) => {
    dispatch(toggleTodoComplete(id));
    console.log("Checked item with ID:", id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
    console.log("Deleted item with ID:", id);
  };

  return (
    <div className="">
      <h1 className="">TodoList</h1>
      {/* {list?.map((todo: Todo) => {
        return <p key={todo?._id}>{todo?.text}</p>;
      })} */}
      {list?.map((todo) => (
        <div key={todo._id} className="mb-2 p-2 border rounded">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo._id)}
            className="w-4 h-4"
          />
          <p className="font-medium">Task: {todo.text}</p>
          <p className="text-sm">Target Date: {todo.targetdate}</p>
          <p className="text-sm">Priority: {todo.priority}</p>

          <button
            onClick={() => handleDelete(todo._id)}
            className="mt-2 sm:mt-0 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
