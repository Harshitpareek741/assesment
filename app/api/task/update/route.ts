import connectDB from "../../../lib/db"; 
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { taskId, title, description, date } = await req.json();


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
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
