import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://TelePoster:HV1AzY816vc95FDl@cluster0.zj6zyvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
