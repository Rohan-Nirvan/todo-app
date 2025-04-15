"use server";

import DbDriver from "@todo-app/db-driver";

declare global {
  var _dbPromise: Promise<void>;
}
console.log("global._dbPromise:", global._dbPromise, Math.random());
if (!global._dbPromise) {
  console.log("connecting dbDriver...", DbDriver);
  global._dbPromise = DbDriver.connect()
  .then(() => {
    console.log("connected dbDriver...", DbDriver);
  })
  .catch(() => {
    console.error("failed connecting dbDriver!");
    // return 'connection failed'
    throw new Error('db connection failed!')
  });
}

export const checkDbPromise = async () => global._dbPromise;
