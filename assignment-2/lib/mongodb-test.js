// Simple test without dotenv
const { MongoClient } = require('mongodb');

// Hardcode your URI temporarily for testing (replace YOUR_PASSWORD)
const uri = "mongodb+srv://miansaadtahir:0789@nexium-mongo.p331bly.mongodb.net/assignment-2?retryWrites=true&w=majority";

async function test() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("✅ MongoDB connected to DB:", client.db().databaseName);
    } catch (err) {
        console.error("❌ FAILED:", err.message);
    } finally {
        await client.close();
    }
}

test();