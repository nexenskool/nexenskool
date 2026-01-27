import { connectDB } from "@/lib/db";
import { validateRequest } from "@/lib/validate";
import { SubService } from "@/models/SubService";
import { createSubServiceSchema } from "@/validators/subService";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const data = await validateRequest(req, createSubServiceSchema);
    const subService = await SubService.create(data);

    return NextResponse.json(
      { success: true, data: subService },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create sub-service",
        errors: error.errors,
      },
      { status: error.status || 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("service");

    const filter = serviceId ? { service: serviceId } : {};

    const subServices = await SubService.find(filter)
      .populate("service")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: subServices,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch sub-services" },
      { status: 500 },
    );
  }
}
