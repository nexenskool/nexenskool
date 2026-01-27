import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { validateRequest } from "@/lib/validate";
import { createTestimonialSchema } from "@/validators/testimonial";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({ isApproved: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await validateRequest(req, createTestimonialSchema);
    const testimonial = await Testimonial.create({
      ...data,
      isApproved: false,
    });

    return NextResponse.json(
      { success: true, message: "Testimonial submitted for review" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
