"use client";

import React, { useState } from "react";
import { Input } from "@todo-app/ui/input";
import { Button } from "@todo-app/ui/button";
import { add } from "../../../lib/db/todo";

const TodoForm = () => {
  const [value, setValue] = useState("");

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

    await add({ text: value });
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
