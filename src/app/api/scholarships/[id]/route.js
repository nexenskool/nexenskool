import { NextResponse } from "next/server";
import slugify from "slugify";
import { connectDB } from "@/lib/db";
import { Scholarship } from "@/models/Scholarship";
import { validateRequest } from "@/lib/validate";
import { updateScholarshipSchema } from "@/validators/scholarship";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const scholarship = await Scholarship.findById(id);

    if (!scholarship) {
      return NextResponse.json(
        { success: false, message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      scholarship,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const data = await validateRequest(req, updateScholarshipSchema);

    const { id } = await params;

    const scholarship = await Scholarship.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!scholarship) {
      return NextResponse.json(
        { success: false, message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      scholarship,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const scholarship = await Scholarship.findByIdAndDelete(id);

    if (!scholarship) {
      return NextResponse.json(
        { success: false, message: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Scholarship deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
