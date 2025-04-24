"use client";

import { useState, useEffect } from "react";
import { getList, Priority, Todo } from "../../../lib";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTodos, TodoState } from "../../../store/slice";
import { deleteTodo, toggleTodoComplete } from "../../../store/slice";
import { toggleTodoCompleteapp } from "../../../lib/db/todo/togglecomplete";

export default function TodoList() {
  const dispatch = useAppDispatch();
  const [hideCompleted, setHideCompleted] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Items per page
  // const [sortOption, setSortOption] = useState<"date" | "priority" | "none">(
  //   "none"
  // );
  const [loading, setLoading] = useState(false); // Loading state
  // async function fetchTodo() {
  //   const todos: Todo[] = await toggleTodoCompleteapp();
  // }
  // fetchTodo(todos);

  useEffect(() => {
    async function initList() {
      setLoading(true); // Start loading
      try {
        const todos: Todo[] = await getList(page, limit);
        dispatch(setTodos(todos));
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false); // End loading
      }
    }
    initList();
  }, [dispatch, page]);

  // useEffect(() => {
  //   async function initList() {
  //     const todos: Todo[] = await getList(page, limit);
  //     // console.log("fetched todos:", todos);
  //     dispatch(setTodos(todos));
  //   }
  //   initList();
  // }, [dispatch, page]);

  const list: Todo[] = useAppSelector((state: TodoState) => state.todos);

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    await toggleTodoCompleteapp(id, completed);
    const updatedTodos: Todo[] = await getList(page, limit); // fetch updated list from DB
    dispatch(setTodos(updatedTodos)); // update Redux store
    console.log("Checked item with ID:", id);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteTodo(id));
    console.log("Deleted item with ID:", id);
    const updatedTodos: Todo[] = await getList(page, limit);
    dispatch(setTodos(updatedTodos));
  };

  // const priorityMap = {
  //   [Priority.High]: 3,
  //   [Priority.Medium]: 2,
  //   [Priority.Low]: 1,
  // };

  const filteredList = list.filter((todo) =>
    hideCompleted ? !todo.completed : true
  );

  // const priorityMap = {
  //   [Priority.High]: 3,
  //   [Priority.Medium]: 2,
  //   [Priority.Low]: 1,
  // };
  // const sortedFilteredList = [...filteredList].sort(
  //   (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
  // );

  // const sortedList = [...list].filter((todo) =>
  //   hideCompleted ? !todo.completed : true
  // );

  // .sort((a, b) => {
  //   if (sortOption === "date") {
  //     return (
  //       new Date(b.targetdate).getTime() - new Date(a.targetdate).getTime()
  //     ); // latest first
  //   } else if (sortOption === "priority") {
  //     const priorityMap = { high: 3, medium: 2, low: 1 };
  //     return priorityMap[b.priority] - priorityMap[a.priority]; // High → Low
  //   }
  //   return 0;
  // });
  return (
    <div className="">
      <h1 className="">TodoList</h1>

      {/* ✅ Toggle Completed Button */}
      <button
        onClick={() => setHideCompleted((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {hideCompleted ? "Show Completed Tasks" : "Hide Completed Tasks"}
      </button>
      {/* ✅ Render Loader */}
      {loading && (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      )}

      {/* ✅ Sort Buttons
      <div className="mb-4 flex gap-3">
        <span className="font-semibold">Sort by:</span>
        <button
          onClick={() => setSortOption("date")}
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Date
        </button>
        <button
          onClick={() => setSortOption("priority")}
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Priority
        </button>
        <button
          onClick={() => setSortOption("none")}
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Clear Sort
        </button>
      </div> */}

      {/* ✅ Render Sorted & Filtered List */}
      {filteredList.map((todo) => (
        <div key={todo._id} className="mb-2 p-2 border rounded">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo._id, todo.completed)}
            className="w-4 h-4"
          />

          <p
            className={`font-medium text-lg ${
              todo.completed ? "line-through text-gray-400 cross" : "text-black"
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
//   return (
//     <div className="">
//       <h1 className="">TodoList</h1>
//       <button
//         onClick={() => setHideCompleted((prev) => !prev)}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         {hideCompleted ? "Show Completed Tasks" : "Hide Completed Tasks"}
//       </button>
//       {list
//         ?.filter((todo) => (hideCompleted ? !todo.completed : true))
//         .map((todo) => (
//           <div key={todo._id} className="mb-2 p-2 border rounded">
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => handleCheckboxChange(todo._id, todo.completed)}
//               className="w-4 h-4"
//             />

//             <p
//               className={`font-medium text-lg ${
//                 todo.completed ? "line-through text-gray-400" : "text-black"
//               }`}
//             >
//               Task: {todo.text}
//             </p>

//             <p className="text-sm">Target Date: {todo.targetdate}</p>
//             <p className="text-sm">Priority: {todo.priority}</p>

//             <button
//               onClick={() => handleDelete(todo._id)}
//               className="mt-2 sm:mt-0 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// }
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
