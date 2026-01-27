import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Scholarship } from "@/models/Scholarship";
import { validateRequest } from "@/lib/validate";
import { createScholarshipSchema } from "@/validators/scholarship";

export async function POST(req) {
  try {
    await connectDB();

    const data = await validateRequest(req, createScholarshipSchema);

    const scholarship = await Scholarship.create(data);

    return NextResponse.json(
      {
        success: true,
        scholarship,
      },
      { status: 201 }
    );
  } catch (error) {
    const status =
      error.name == "ZodError" || error.message.includes("validation")
        ? 400
        : 500;
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const scholarships = await Scholarship.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      scholarships,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
