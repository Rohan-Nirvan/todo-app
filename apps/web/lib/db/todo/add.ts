'use server'

import MongoDBWrapper from "@todo-app/db-driver"

export default async function add() {
   await MongoDBWrapper.insertOne('todos', {testing: Math.random().toFixed(3)})
}