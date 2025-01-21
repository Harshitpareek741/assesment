import connectDB from  "../../../lib/db"; 
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { taskId, title, description, date } = await req.json();

    if (!taskId || !title || !description || !date) {
      return NextResponse.json(
        { error: "TaskId, title, description, and date are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, date },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { error: "Task not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task updated successfully.", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
