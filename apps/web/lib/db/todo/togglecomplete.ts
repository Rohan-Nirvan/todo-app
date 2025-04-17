"use server";

import { ObjectId } from "mongodb";
import DbDriver from "@todo-app/db-driver";

export async function toggleTodoCompleteapp(
  id: string,
  currentStatus: boolean
): Promise<void> {
  try {
    await DbDriver.connect();
    console.log("🛠 Updating todo:", id, "currentStatus:", currentStatus);

    const result = await DbDriver.updateOne(
      "todos",
      { _id: new ObjectId(id) },
      { completed: !currentStatus } // this already wraps in $set inside the wrapper
    );

    console.log("✅ Update result:", result);

    if (result.modifiedCount === 0) {
      throw new Error(
        "No document updated. Check ObjectId format or document existence."
      );
    }
  } catch (err) {
    console.error("❌ toggle complete failed:", err);
    throw new Error("Failed to update todo status");
  }
}

// "use server";
// import DbDriver from "@todo-app/db-driver";
// import { ObjectId } from "mongodb";
// export async function toggleTodoCompleteapp(
//   id: string,
//   currentStatus: boolean
// ): Promise<void> {
//   try {
//     await DbDriver.connect();
//     await DbDriver.updateOne(
//       "todos",
//       { _id: new ObjectId(id) },
//       { $set: { completed: !currentStatus } }
//     );
//   } catch (err) {
//     console.error("toggle complete failed:", err);
//     throw new Error("Failed to update todo status");
//   }
// }
