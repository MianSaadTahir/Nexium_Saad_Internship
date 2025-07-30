// /grand-project/lib/mongo.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reuse global client in dev to prevent hot reload issues
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, just create new
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToMongo() {
  const client = await clientPromise;
  return client.db("grand_project");
}
