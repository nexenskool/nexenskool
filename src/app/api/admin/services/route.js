import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { validateRequest } from "@/lib/validate";
import { createServiceSchema } from "@/validators/service";
import { Service } from "@/models/Service";
import { generateSlug } from "@/lib/slug";

export async function POST(req) {
  try {
    await connectDB();

    const data = await validateRequest(req, createServiceSchema);

    let slug = generateSlug(data.name);

    let service = await Service.findOne({ slug });
    if (service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service already created",
        },
        { status: 409 }
      );
    }

    await Service.create({
      ...data,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
      },
      { status: 201 }
    );
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

export async function GET(_) {
  try {
    await connectDB();

    const services = await Service.find();
    return NextResponse.json(
      {
        success: true,
        message: "Services fetched successfully",
        services,
      },
      { status: 200 }
    );
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
