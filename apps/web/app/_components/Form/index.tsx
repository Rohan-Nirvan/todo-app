"use client";

import React, { useState } from "react";
import { Input } from "@todo-app/ui/input";
import { Button } from "@todo-app/ui/button";
import { add } from "../../../lib/db/todo";
import { addTodo } from "../../../store/slice";
import { useAppDispatch } from "../../../store/hooks";
import { Priority, Todo } from "../../../lib";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.Medium);

  // const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const dispatch = useAppDispatch();
  const [targetdate, setTargetdate] = useState("");

  const validateForm = (): boolean => {
    if (!value.trim() && !targetdate && !priority) return false;

    return true;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isValid: boolean = validateForm();

    if (!isValid) return;

    const newTodo: Todo = await add({
      text: value,
      priority: priority as Priority,
      targetdate,
    });

    // const newTodo: Todo = await add({ text: value, priority, targetdate });
    // .catch((err: unknown) => {
    //   console.log("add failed:", err);
    // }); // Make sure this returns the created todo
    dispatch(addTodo(newTodo));
    setValue("");
    setTargetdate("");
    setPriority(Priority.Medium);

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

      {/* Date Picker */}
      <Input
        type="date"
        value={targetdate}
        onChange={(event) => setTargetdate(event.target.value)}
      />

      {/* Priority Dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value={Priority.High}>High</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.Low}>Low</option>
      </select>

      {/* <select
        className="border px-3 py-2 rounded w-full"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "high" | "medium" | "low")
        }
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select> */}

      {/* <Button appName={"web"} onClick={handleSubmit}>
        Add
      </Button> */}
      <Button type="submit" appName="web">
        Add Task
      </Button>
    </form>
  );
};

export default TodoForm;
