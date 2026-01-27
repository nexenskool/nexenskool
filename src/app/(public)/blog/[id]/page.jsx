"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Moment from "moment";
import { useState } from "react";
import { useGetBlogByIdQuery } from "@/store/api/adminBlogApi";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBlogByIdQuery(id);

  const blog = data?.blog;
  console.log(blog);

  if (isLoading) {
    return (
      <section className="py-20">
        <p className="text-center text-gray-500">Loading blog...</p>
      </section>
    );
  }

  if (isError || !blog) {
    return (
      <section className="py-20">
        <p className="text-center text-red-500">Failed to load blog details.</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-[#2495ef] font-medium hover:underline"
        >
          ← Back to Blogs
        </Link>

        {/* Header */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-[#2495ef] py-4 font-medium">
            Published on {Moment(blog.createdAt).format("MMMM Do YYYY")}
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold max-w-3xl mx-auto text-gray-900">
            {blog.title}
          </h1>

          {blog.subTitle && (
            <h2 className="my-5 max-w-xl mx-auto text-gray-600">
              {blog.subTitle}
            </h2>
          )}

          <span className="inline-block py-1 px-4 rounded-full mb-6 border border-[#2495ef]/30 bg-[#2495ef]/5 text-sm font-medium text-[#2495ef]">
            Sagor Hossain
          </span>
        </div>

        <div className="mx-auto max-w-5xl my-10">
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-3xl mb-8 w-full h-[420px] object-cover shadow-lg"
          />

          <div
            className="prose prose-lg max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </div>
    </section>
  );
}
