import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";

const uri =
  "mongodb+srv://saidumarovjafarxon:3hq0F4dsnamY2POo@cluster0.com3cmr.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function GET() {
  const db = await connectToDatabase();
  const collection = db.collection("products");
  const users = await collection.find().toArray();
  return Response.json(users);
}
