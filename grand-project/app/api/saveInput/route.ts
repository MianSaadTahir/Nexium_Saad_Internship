import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { ingredients, diet, userEmail, userName } = await req.json();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("grand_project");
    const collection = db.collection("preferences");

    await collection.insertOne({
      userEmail,
      userName,
      ingredients,
      diet,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
