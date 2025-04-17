// "use server";

import {
  MongoClient,
  Db,
  Collection,
  Document,
  OptionalUnlessRequiredId,
  MongoClientOptions,
  WithId,
  MatchKeysAndValues,
  FindOptions,
  Abortable,
  InsertOneOptions,
  UpdateResult,
} from "mongodb";

declare global {
  // TODO: usage can be conditional for "development" using an env var
  // Only for development: attach to globalThis
  var _mongoClient: MongoClient | null;
  var _mongoDb: Db | null;
}

class MongoDBWrapper {
  public static client: MongoClient | null = global._mongoClient || null;
  private static db: Db | null = global._mongoDb || null;
  private static uri: string = "mongodb://localhost:27017";
  private static dbName: string = "myDatabase";

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to initialize the MongoDB client and connect to the database
  public static async connect(): Promise<MongoClient> {
    if (this.client && this.db) return this.client;

    try {
      // New connection logic for v6.x, without useUnifiedTopology
      const options: MongoClientOptions = {
        serverSelectionTimeoutMS: 5000, // Timeout for initial server selection
      };

      this.client = new MongoClient(this.uri, options);
      await this.client.connect();
      this.db = this.client.db(this.dbName);

      global._mongoClient = this.client;
      global._mongoDb = this.db;

      console.log("MongoDBWrapper Connected to MongoDB");
      return this.client;
    } catch (error) {
      console.error("MongoDBWrapper Error connecting to MongoDB:", error);
      throw error;
    }
  }

  // Static method to get a collection
  public static getCollection<T extends Document>(
    collectionName: string
  ): Collection<T> {
    if (!this.db) {
      throw new Error("MongoDB connection is not established");
    }
    return this.db.collection<T>(collectionName);
  }

  // Static method to insert a document (fixing the type error with OptionalUnlessRequiredId)
  public static async insertOne<T extends Document>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>,
    options?: InsertOneOptions
  ): Promise<void> {
    const collection = this.getCollection<T>(collectionName);
    await collection.insertOne(document, options);
  }

  // Static method to find documents in a collection
  public static async find<T extends Document>(
    collectionName: string,
    query: MatchKeysAndValues<T>,
    options: FindOptions & Abortable = {}
  ): Promise<WithId<T>[]> {
    const collection = this.getCollection<T>(collectionName);
    return collection.find(query, options).toArray(); // Returns an array of WithId<T>
  }

  public static async updateOne<T extends Document>(
    collectionName: string,
    query: MatchKeysAndValues<T>,
    updateDoc: MatchKeysAndValues<T>
  ): Promise<UpdateResult> {
    const collection = this.getCollection<T>(collectionName);
    return await collection.updateOne(query, { $set: updateDoc });
  }

  // // Static method to update a document
  // public static async updateOne<T extends Document>(
  //   collectionName: string,
  //   query: MatchKeysAndValues<T>,
  //   updateDoc: MatchKeysAndValues<T>
  // ): Promise<void> {
  //   const collection = this.getCollection<T>(collectionName);
  //   await collection.updateOne(query, { $set: updateDoc });
  // }

  // Static method to delete a document
  public static async deleteOne<T extends Document>(
    collectionName: string,
    query: MatchKeysAndValues<T>
  ): Promise<void> {
    const collection = this.getCollection<T>(collectionName);
    await collection.deleteOne(query);
  }

  // Static method to close the MongoDB connection
  public static async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log("MongoDBWrapper MongoDB connection closed");
    }
  }
}

export default MongoDBWrapper;
