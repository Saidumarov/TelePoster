import connectToDatabase from "@/backend/db";

// Ma'lumot qo'shish (Create)
export async function insertData(data: any) {
  const db = await connectToDatabase();
  const collection = db.collection("users");
  await collection.insertOne(data);
}

// Ma'lumot olish (Read)
export async function getData() {
  const db = await connectToDatabase();
  const collection = db.collection("products");
  return await collection.find({}).toArray();
}

// Ma'lumotni yangilash (Update)
export async function updateData(filter: any, update: any) {
  const db = await connectToDatabase();
  const collection = db.collection("users");
  await collection.updateOne(filter, { $set: update });
}

// Ma'lumotni o'chirish (Delete)
export async function deleteData(filter: any) {
  const db = await connectToDatabase();
  const collection = db.collection("users");
  await collection.deleteOne(filter);
}
