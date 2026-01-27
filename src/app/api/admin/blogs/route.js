import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { validateRequest } from "@/lib/validate";
import { createBlogSchema } from "@/validators/blog";

export async function POST(req) {
  try {
    await connectDB();
    const data = await validateRequest(req, createBlogSchema);

    const blog = await Blog.create(data);

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
