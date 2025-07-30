import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json();
    if (!userEmail) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("grand-project");
    const collection = db.collection("preferences");

    const preferences = await collection.find({ userEmail }).toArray();

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
