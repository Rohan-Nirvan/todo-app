"use client";

import { useState, useEffect } from "react";
import { getList, Todo } from "../../../lib";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTodos, TodoState } from "../../../store/slice";
import { deleteTodo, toggleTodoComplete } from "../../../store/slice";
import { toggleTodoCompleteapp } from "../../../lib/db/todo/togglecomplete";

export default function TodoList() {
  const dispatch = useAppDispatch();
  const [hideCompleted, setHideCompleted] = useState(false);
  // async function fetchTodo() {
  //   const todos: Todo[] = await toggleTodoCompleteapp();
  // }
  // fetchTodo(todos);

  useEffect(() => {
    async function initList() {
      const todos: Todo[] = await getList();
      // console.log("fetched todos:", todos);
      dispatch(setTodos(todos));
    }
    initList();
  }, [dispatch]);

  const list: Todo[] = useAppSelector((state: TodoState) => state.todos);

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    await toggleTodoCompleteapp(id, completed);
    const updatedTodos: Todo[] = await getList(); // fetch updated list from DB
    dispatch(setTodos(updatedTodos)); // update Redux store
    console.log("Checked item with ID:", id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
    console.log("Deleted item with ID:", id);
  };

  return (
    <div className="">
      <h1 className="">TodoList</h1>
      <button
        onClick={() => setHideCompleted((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {hideCompleted ? "Show Completed Tasks" : "Hide Completed Tasks"}
      </button>
      {list
        ?.filter((todo) => (hideCompleted ? !todo.completed : true))
        .map((todo) => (
          <div key={todo._id} className="mb-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo._id, todo.completed)}
              className="w-4 h-4"
            />

            <p
              className={`font-medium text-lg ${
                todo.completed ? "line-through text-gray-400" : "text-black"
              }`}
            >
              Task: {todo.text}
            </p>

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
//   return (
//     <div className="">
//       <h1 className="">TodoList</h1>

//       {/* {list?.map((todo: Todo) => {
//         return <p key={todo?._id}>{todo?.text}</p>;
//       })} */}
//       {list?.map((todo) => (
//         <div key={todo._id} className="mb-2 p-2 border rounded">
//           <input
//             type="checkbox"
//             checked={todo.completed}
//             onChange={() => handleCheckboxChange(todo._id, todo.completed)}
//             className="w-4 h-4"
//           />

//           <p
//             className={`font-medium text-lg ${
//               todo.completed ? "line-through text-gray-400 cross" : "text-black"
//             }`}
//             // className={`font-medium text-lg ${
//             //   true ? "line-through text-gray-400" : "text-black"
//             // }`}
//           >
//             Task: {todo.text}
//           </p>
//           {/* <p className="font-medium">Task: {todo.text}</p> */}
//           <p className="text-sm">Target Date: {todo.targetdate}</p>
//           <p className="text-sm">Priority: {todo.priority}</p>

//           <button
//             onClick={() => handleDelete(todo._id)}
//             className="mt-2 sm:mt-0 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
