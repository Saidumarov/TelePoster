import { connectToDatabase } from "@/app/api/database";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const db = await connectToDatabase();
    const collection = db.collection("users");

    // Check if a user with the given email exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // Check if the password matches
      if (existingUser.password === password) {
        // Remove password from the response

        return Response.json(
          { message: "Login successful", user: existingUser },
          { status: 200 }
        );
      } else {
        return Response.json(
          { message: "Incorrect password" },
          { status: 401 }
        );
      }
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling login POST request:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
