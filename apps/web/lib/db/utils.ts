import { ObjectId } from 'mongodb';

type MongoDoc<T> = T & { _id: ObjectId };

export function mapDbDocObjectIdToString<T>(doc: MongoDoc<T>): T & { _id: string } {
  return {
    ...doc,
    _id: doc._id.toString(),
  };
}

export function mapDbDocsObjectIdToString<T>(docs: MongoDoc<T>[]): (T & { _id: string })[] {
    return docs?.map((doc: MongoDoc<T>) => mapDbDocObjectIdToString(doc))
}