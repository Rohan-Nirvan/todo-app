"use client";

import React from "react";
import { useForm } from "react-hook-form";
// import { Input } from "@todo-app/ui/input";
import { Button } from "@todo-app/ui/button";
import { add } from "../../../lib/db/todo";
import { addTodo } from "../../../store/slice";
import { useAppDispatch } from "../../../store/hooks";
import { Priority, Todo } from "../../../lib";

type FormValues = {
  text: string;
  priority: Priority;
  targetdate: string;
};

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      text: "",
      priority: Priority.Medium,
      targetdate: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const newTodo: Todo = await add(data);
      dispatch(addTodo(newTodo));
      reset(); // reset the form to default values
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Text Input */}
      <input
        {...register("text", { required: "Task description is required" })}
        placeholder="Enter task"
      />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}

      {/* Target Date */}
      <input
        type="date"
        {...register("targetdate", { required: "Target date is required" })}
      />
      {errors.targetdate && (
        <p className="text-red-500 text-sm">{errors.targetdate.message}</p>
      )}

      {/* Priority Select */}
      <select
        {...register("priority")}
        className="border px-3 py-2 rounded w-full"
      >
        <option value={Priority.High}>High</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.Low}>Low</option>
      </select>

      {/* Submit */}
      <Button type="submit" appName="web">
        Add Task
      </Button>
    </form>
  );
};

export default TodoForm;

// "use client";

// import React, { useState } from "react";
// import { Input } from "@todo-app/ui/input";
// import { Button } from "@todo-app/ui/button";
// import { add } from "../../../lib/db/todo";
// import { addTodo } from "../../../store/slice";
// import { useAppDispatch } from "../../../store/hooks";
// import { Priority, Todo } from "../../../lib";

// const TodoForm = () => {
//   const [value, setValue] = useState("");
//   const [priority, setPriority] = useState<Priority>(Priority.Medium);

//   // const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
//   const dispatch = useAppDispatch();
//   const [targetdate, setTargetdate] = useState("");

//   const validateForm = (): boolean => {
//     if (!value.trim() && !targetdate && !priority) return false;

//     return true;
//   };

//   const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     const isValid: boolean = validateForm();

//     if (!isValid) return;

//     const newTodo: Todo = await add({
//       text: value,
//       priority: priority as Priority,
//       targetdate,
//     });

//     // const newTodo: Todo = await add({ text: value, priority, targetdate });
//     // .catch((err: unknown) => {
//     //   console.log("add failed:", err);
//     // }); // Make sure this returns the created todo
//     dispatch(addTodo(newTodo));
//     setValue("");
//     setTargetdate("");
//     setPriority(Priority.Medium);

//     // await add({ text: value });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* TodoForm */}
//       <Input
//         value={value}
//         onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//           setValue(event?.target?.value)
//         }
//       />

//       {/* Date Picker */}
//       <Input
//         type="date"
//         value={targetdate}
//         onChange={(event) => setTargetdate(event.target.value)}
//       />

//       {/* Priority Dropdown */}
//       <select
//         value={priority}
//         onChange={(e) => setPriority(e.target.value as Priority)}
//       >
//         <option value={Priority.High}>High</option>
//         <option value={Priority.Medium}>Medium</option>
//         <option value={Priority.Low}>Low</option>
//       </select>

//       {/* <select
//         className="border px-3 py-2 rounded w-full"
//         value={priority}
//         onChange={(e) =>
//           setPriority(e.target.value as "high" | "medium" | "low")
//         }
//       >
//         <option value="high">High Priority</option>
//         <option value="medium">Medium Priority</option>
//         <option value="low">Low Priority</option>
//       </select> */}

//       {/* <Button appName={"web"} onClick={handleSubmit}>
//         Add
//       </Button> */}
//       <Button type="submit" appName="web">
//         Add Task
//       </Button>
//     </form>
//   );
// };

// export default TodoForm;
