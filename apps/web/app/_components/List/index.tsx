"use client";

import { useEffect } from "react";
import { getList, Todo } from "../../../lib";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTodos, TodoState } from "../../../store/slice";

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

  return (
    <div className="">
      <h1 className="">TodoList</h1>
      {/* {list?.map((todo: Todo) => {
        return <p key={todo?._id}>{todo?.text}</p>;
      })} */}
      {list?.map((todo) => (
        <div key={todo._id} className="mb-2 p-2 border rounded">
          <p className="font-medium">Task: {todo.text}</p>
          <p className="text-sm">Target Date: {todo.targetdate}</p>
          <p className="text-sm">Priority: {todo.priority}</p>
        </div>
      ))}
    </div>
  );
}
