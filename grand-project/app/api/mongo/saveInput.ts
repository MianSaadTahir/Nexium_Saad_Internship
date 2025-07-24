import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)
const dbName = 'nexiumApp'

export async function saveInput(ingredients: string, diet: string) {
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection('inputs')

    const doc = {
      ingredients,
      diet,
      createdAt: new Date()
    }

    await collection.insertOne(doc)
  } finally {
    await client.close()
  }
}
