"use client";

import React, { useState } from "react";
import { Input } from "@todo-app/ui/input";
import { Button } from "@todo-app/ui/button";
import { add } from "../../../lib/db/todo";
import { addTodo } from "../../../store/slice";
import { useAppDispatch } from "../../../store/hooks";
import { Todo } from "../../../lib";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const validateForm = (): boolean => {
    if (!value.trim()) return false;

    return true;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isValid: boolean = validateForm();

    if (!isValid) return;

    const newTodo: Todo = await add({ text: value });
    // .catch((err: unknown) => {
    //   console.log("add failed:", err);
    // }); // Make sure this returns the created todo
    dispatch(addTodo(newTodo));
    setValue("");

    // await add({ text: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* TodoForm */}
      <Input
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event?.target?.value)
        }
      />
      {/* <Button appName={"web"} onClick={handleSubmit}>
        Add
      </Button> */}
    </form>
  );
};

export default TodoForm;
