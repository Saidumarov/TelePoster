import { connectToDatabase } from "@/app/api/database";
import { NextRequest } from "next/server";

// User create
export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, password } = await request.json();

    const db = await connectToDatabase();
    const collection = db.collection("users");

    // Check if a user with the given email already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already registered" },
        { status: 400 }
      );
    }

    // Insert the new user
    const Insert = await collection.insertOne({
      firstname,
      lastname,
      email,
      password,
    });

    const newUser = {
      message: "Register successful",
      user: { _id: Insert.insertedId, firstname, lastname, email, password },
    };

    return Response.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// User update
export async function PUT(request: NextRequest) {
  try {
    const { email, firstname, lastname, password } = await request.json();

    const db = await connectToDatabase();
    const collection = db.collection("users");

    // Check if a user with the given email exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // Update the user's information
      await collection.updateOne(
        { email },
        {
          $set: {
            firstname,
            lastname,
            password,
          },
        }
      );

      return Response.json(
        { message: "User information updated", user: existingUser },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// User delete
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    const db = await connectToDatabase();
    const collection = db.collection("users");

    // Check if a user with the given email exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // Delete the user
      await collection.deleteOne({ email });

      return Response.json({ message: "User deleted" }, { status: 200 });
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
