"use client";

import Link from "next/link";
import { useGetBlogsQuery } from "@/store/api/adminBlogApi";

export default function BlogsPage() {
  const { data, isLoading, isError } = useGetBlogsQuery();
  const blogs = data?.blogs?.filter((b) => b.isPublished) || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Our Blogs
        </h1>

        {isLoading ? (
          /* Skeleton Loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <p className="text-center text-red-500">Failed to load blogs.</p>
        ) : blogs.length === 0 ? (
          /* Empty */
          <p className="text-center text-gray-500">No blogs available yet</p>
        ) : (
          /* Data */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {blog.title}
                  </h2>

                  {blog.subTitle && (
                    <p className="text-gray-600">{blog.subTitle}</p>
                  )}

                  <Link
                    href={`/blog/${blog._id}`}
                    className="mt-auto text-[#2495ef] font-medium hover:underline"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
