import { connectToDatabase } from "@/app/api/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("Authorization");

    // Check if the Authorization header is present and matches the expected value
    if (authorizationHeader !== "1245678") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const collection = db.collection("users");
    const users = await collection.find().toArray();

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
