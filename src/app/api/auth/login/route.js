import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { validateRequest } from "@/lib/validate";
import { User } from "@/models/User";
import { loginSchema } from "@/validators/auth";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/token";
import { setCookie } from "@/lib/cookies";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await validateRequest(req, loginSchema);

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      "1d"
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    setCookie(response, "auth_token", token);
    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        errors: error.errors,
      },
      { status: error.status || 500 }
    );
  }
}
