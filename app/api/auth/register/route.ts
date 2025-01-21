import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db"; 
import bcrypt from 'bcrypt';
import User from "@/app/models/user";

export async function POST(request: Request) {
  try {
    const saltRounds = 10 ; 
    
    await dbConnect();
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      password  : hashedPassword 
    });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully.", User: { email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
