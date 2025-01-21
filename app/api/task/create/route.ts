import connectDB from  "../../../lib/db"; 
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, date, userId } = await req.json();

    if (!title || !description || !date || !userId) {
      return NextResponse.json(
        { error: "Title, description, date, and userId are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const newTask = new Task({
      title,
      description,
      date,
      userId,
    });

    await newTask.save();

    return NextResponse.json(
      { message: "Task created successfully.", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
