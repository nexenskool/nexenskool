import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { validateRequest } from "@/lib/validate";
import { updateServiceSchema } from "@/validators/service";
import { Service } from "@/models/Service";
import { generateSlug } from "@/lib/slug";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid service ID",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch service",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const updates = await validateRequest(req, updateServiceSchema);
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    if (updates.name && updates.name !== service.name) {
      let baseSlug = generateSlug(updates.name);
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await Service.findOne({
          slug: uniqueSlug,
          _id: { $ne: service._id },
        })
      ) {
        uniqueSlug = `${baseSlug}-${counter++}`;
      }

      updates.slug = uniqueSlug;
    }

    Object.assign(service, updates);
    await service.save();

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
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

export async function DELETE(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete service",
      },
      { status: 500 }
    );
  }
}
