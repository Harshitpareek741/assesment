import connectDB from "../../../lib/db";
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // Correct way to get query parameters
    const date = url.searchParams.get("date");

    if (!userId || !date) {
      return NextResponse.json(
        { error: "userId and date are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const tasks = await Task.find({ userId, date });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
