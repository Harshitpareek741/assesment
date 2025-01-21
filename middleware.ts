import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 
  const url = req.url;


  if (token) {
    if (url.includes("/login") || url.includes("/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url)); 
    }
  } else {
    if (url.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url)); 
    }
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"], 
};
