import DbDriver from "@todo-app/db-driver";

declare global {
  var _dbPromise: Promise<void>;
}
console.log("global._dbPromise:", global._dbPromise);
if (!global._dbPromise) {
  console.log("connecting dbDriver...");
  global._dbPromise = DbDriver.connect().catch(() => {
    console.error("failed connecting dbDriver!");
  });
}

export const dbPromise = global._dbPromise;
