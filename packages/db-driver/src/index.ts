'use-server';

import { MongoClient, Db, Collection, Document, OptionalUnlessRequiredId, MongoClientOptions, WithId, MatchKeysAndValues } from 'mongodb';

class MongoDBWrapper {
  private static client: MongoClient | null = null;
  private static db: Db | null = null;
  private static uri: string = 'mongodb://localhost:27017'; // Your MongoDB URI
  private static dbName: string = 'myDatabase'; // Your database name

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static method to initialize the MongoDB client and connect to the database
  public static async connect(): Promise<void> {
    if (this.client && this.db) return;

    try {
      // New connection logic for v6.x, without useUnifiedTopology
      const options: MongoClientOptions = {
        serverSelectionTimeoutMS: 5000, // Timeout for initial server selection
      };

      this.client = new MongoClient(this.uri, options);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  // Static method to get a collection
  public static getCollection<T extends Document>(collectionName: string): Collection<T> {
    if (!this.db) {
      throw new Error('MongoDB connection is not established');
    }
    return this.db.collection<T>(collectionName);
  }

  // Static method to insert a document (fixing the type error with OptionalUnlessRequiredId)
  public static async insertOne<T extends Document>(collectionName: string, document: OptionalUnlessRequiredId<T>): Promise<void> {
    const collection = this.getCollection<T>(collectionName);
    await collection.insertOne(document);
  }

  // Static method to find documents in a collection
  public static async find<T extends Document>(collectionName: string, query: MatchKeysAndValues<T>): Promise<WithId<T>[]> {
    const collection = this.getCollection<T>(collectionName);
    return collection.find(query).toArray();  // Returns an array of WithId<T>
  }

  // Static method to update a document
  public static async updateOne<T extends Document>(collectionName: string, query: MatchKeysAndValues<T>, updateDoc: MatchKeysAndValues<T>): Promise<void> {
    const collection = this.getCollection<T>(collectionName);
    await collection.updateOne(query, { $set: updateDoc });
  }

  // Static method to delete a document
  public static async deleteOne<T extends Document>(collectionName: string, query: MatchKeysAndValues<T>): Promise<void> {
    const collection = this.getCollection<T>(collectionName);
    await collection.deleteOne(query);
  }

  // Static method to close the MongoDB connection
  public static async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }
}

export default MongoDBWrapper;
