import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export async function PATCH(_, { params }) {
  try {
    await connectDB();

    const {id} = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    testimonial.isApproved = !testimonial.isApproved;
    await testimonial.save();

    return NextResponse.json({
      success: true,
      message: `Testimonial ${
        testimonial.isApproved ? "approved" : "unapproved"
      } successfully`,
      isApproved: testimonial.isApproved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
