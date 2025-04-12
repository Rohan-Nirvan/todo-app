'use client';

import add from "../../../lib/db/todo/add";

// import MongoDBWrapper from '@todo-app/db-driver'


export default function Test () {
    return <button
        onClick={() => {
            // MongoDBWrapper.insertOne('todos', {testing: Math.random().toFixed(3)})

            add();
        }}
    >
        Test add
    </button>
}