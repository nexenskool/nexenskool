import { connectDB } from "@/lib/db";
import { SubService } from "@/models/SubService";
import { updateSubServiceSchema } from "@/validators/subService";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const subService = await SubService.findById(id).populate("service");

    if (!subService) {
      return NextResponse.json(
        { success: false, message: "Sub-service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subService });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch sub-service" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const data = await validateRequest(req, updateSubServiceSchema);

    const updated = await SubService.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Sub-service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Update failed",
        errors: error.errors,
      },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const deleted = await SubService.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Sub-service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sub-service deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
