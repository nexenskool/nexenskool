import { connectDB } from "@/lib/db";
import { validateRequest } from "@/lib/validate";
import { User } from "@/models/User";
import { registerSchema } from "@/validators/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await validateRequest(req, registerSchema);

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    await User.create({
      email,
      password,
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        errors: error.errors,
      },
      {
        status: error.status || 500,
      }
    );
  }
}
