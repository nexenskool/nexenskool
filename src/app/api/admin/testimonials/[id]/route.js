import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { validateRequest } from "@/lib/validate";
import { updateTestimonialSchema } from "@/validators/testimonial";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial)
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, testimonial });
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

    const { id } = await params;
    const data = await validateRequest(req, updateTestimonialSchema);

    const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!testimonial)
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, testimonial });
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
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial)
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
