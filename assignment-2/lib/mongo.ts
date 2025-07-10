// lib/mongo.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const options = {};

// Ensure global type for TS
declare global {
    // Allow var on globalThis
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
    // Use a cached global promise in development to prevent hot-reload issues
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, always create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
