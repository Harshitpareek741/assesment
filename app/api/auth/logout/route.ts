import { NextResponse } from "next/server";

export async function POST() {
  try {

    const response = NextResponse.json({ message: "Logged out successfully" });
    
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), 
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
