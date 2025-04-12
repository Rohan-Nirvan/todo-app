'use server';

import {dbPromise} from '../../lib/db'

import MongoDBWrapper from '@todo-app/db-driver'
import Test from './_components/Test'

export default async function TodoPage() {
    await dbPromise;

    MongoDBWrapper.find('todo', {})
    return <div>
        TodoPage

        <Test />
    </div>
}