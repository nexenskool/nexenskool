import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { validateRequest } from "@/lib/validate";
import { updateBlogSchema } from "@/validators/blog";

export async function GET(_, { params }) {
  await connectDB();
  const { id } = await params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json(
      { success: false, message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await validateRequest(req, updateBlogSchema);
    const { id } = await params;

    const blog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  await connectDB();

  const { id } = await params;
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return NextResponse.json(
      { success: false, message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Blog deleted",
  });
}
