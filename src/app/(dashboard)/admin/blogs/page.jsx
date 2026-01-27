"use client";

import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "@/store/api/adminBlogApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function AdminBlogsPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      setDeletingId(id);
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted");
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  /* Loading skeleton */
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="p-6 text-red-600">Failed to load blogs</p>;
  }

  const blogs = data?.blogs || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blogs</h1>
          <p className="text-gray-500 text-sm">
            Manage blog posts and publication status
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/blogs/create")}
          className="flex items-center gap-2 bg-[#2495ef] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* Empty state */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 mb-4">No blogs found</p>
          <button
            onClick={() => router.push("/admin/blogs/create")}
            className="bg-[#2495ef] text-white px-4 py-2 rounded-lg"
          >
            Create Blog
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Mobile + Tablet: Cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500">{blog.category}</p>

                    <div>
                      <span
                        className={`inline-flex text-xs font-medium px-2 py-1 rounded-full ${
                          blog.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/blogs/${blog._id}/edit`)
                      }
                      className="text-blue-600 hover:underline"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      disabled={deletingId === blog._id}
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Image */}
                {blog.image && (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-gray-100">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ✅ Desktop: Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[950px] table-fixed">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="p-4 text-left w-[350px]">Title</th>
                  <th className="p-4 text-left w-[170px]">Category</th>
                  <th className="p-4 text-left w-[140px]">Status</th>
                  <th className="p-4 text-left w-[170px]">Image</th>
                  <th className="p-4 text-right w-[180px]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t hover:bg-gray-50 transition align-top"
                  >
                    <td className="p-4 font-medium break-words">
                      {blog.title}
                    </td>

                    <td className="p-4 text-gray-500 break-words">
                      {blog.category}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex text-xs font-medium px-2 py-1 rounded-full ${
                          blog.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="p-4">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          width={160}
                          height={110}
                          className="w-36 h-24 object-cover rounded-md border border-gray-100"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() =>
                          router.push(`/admin/blogs/${blog._id}/edit`)
                        }
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        title="Edit"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        disabled={deletingId === blog._id}
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
