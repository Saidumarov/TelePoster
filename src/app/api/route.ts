import { NextApiRequest, NextApiResponse } from "next";
import {
  getData,
  insertData,
  updateData,
  deleteData,
} from "@/backend/auth/register/route";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getData();
    return NextResponse.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newData = req.body;
    await insertData(newData);
    return res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to insert data" });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { filter, update } = req.body;
    await updateData(filter, update);
    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update data" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { filter } = req.body;
    await deleteData(filter);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete data" });
  }
}
