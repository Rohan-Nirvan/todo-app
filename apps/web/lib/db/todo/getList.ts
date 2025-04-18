"use server";

import DbDriver from "@todo-app/db-driver";
import { DBTodo, Todo } from "../../types";
import { mapDbDocsObjectIdToString } from "../utils";
export async function getList(page = 1, limit = 5): Promise<Todo[]> {
  try {
    await DbDriver.connect();

    const skip = (page - 1) * limit;

    const todos: DBTodo[] = await DbDriver.aggregate<DBTodo>("todos", [
      {
        $addFields: {
          sortPriority: {
            $switch: {
              branches: [
                { case: { $eq: ["$priority", "high"] }, then: 3 },
                { case: { $eq: ["$priority", "medium"] }, then: 2 },
                { case: { $eq: ["$priority", "low"] }, then: 1 },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $sort: {
          sortPriority: -1, // descending priority
          targetdate: 1, // then by ascending target date
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const mappedTodos: Todo[] = mapDbDocsObjectIdToString(todos);
    return mappedTodos;
  } catch (err: unknown) {
    console.error("todo list fetch failed:", err);
    throw new Error("Something went wrong!");
  }
}
// export async function getList(page = 1, limit = 5): Promise<Todo[]> {
//   try {
//     await DbDriver.connect();

//     const skip = (page - 1) * limit;

//     const todos: DBTodo[] = await DbDriver.find<DBTodo>(
//       "todos",
//       {},
//       {
//         limit,
//         skip,
//         // limit: 12,
//         sort: {
//           targetdate: 1, // ascending date
//           // priority: -1, // descending priority
//         },
//       }
//     );

//     const mappedTodos: Todo[] = mapDbDocsObjectIdToString(todos);
//     // console.log("mappedTodos:", mappedTodos);
//     return mappedTodos;
//   } catch (err: unknown) {
//     console.error("todo add failed:", err);
//     throw new Error("Something went wrong!");
//   }
// }
