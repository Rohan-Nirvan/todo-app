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
  }, []);

  const list: Todo[] = useAppSelector((state: TodoState) => state.todos);

  return (
    <div>
      TodoList
      {list?.map((todo: Todo) => {
        return <p key={todo?._id}>{todo?.text}</p>;
      })}
    </div>
  );
}
