import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;

    const path = req.nextUrl.pathname;

    if (role === "admin") {
      if (!path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } else if (role === "user") {
      if (!path.startsWith("/user")) {
        return NextResponse.redirect(new URL("/user", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
