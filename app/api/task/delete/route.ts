import connectDB from  "../../../lib/db"; 
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json();
    
    if (!taskId) {
      return NextResponse.json(
        { error: "TaskId is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json(
        { error: "Task not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully." },
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
