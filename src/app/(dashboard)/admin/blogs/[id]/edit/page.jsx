"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/store/api/adminBlogApi";
import { updateBlogSchema } from "@/validators/blog";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateBlogSchema),
  });

  useEffect(() => {
    if (data?.blog) reset(data.blog);
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateBlog({ id, data: formData }).unwrap();
      toast.success("Blog updated");
      router.push("/admin/blogs");
    } catch {
      toast.error("Failed to update blog");
    }
  };

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <p className="text-gray-500 text-sm">Update blog details</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <div>
          <label className="label">Title</label>
          <input {...register("title")} className="input" />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="label">Subtitle</label>
          <input {...register("subTitle")} className="input" />
        </div>

        <div>
          <label className="label">Category</label>
          <input {...register("category")} className="input" />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input {...register("image")} className="input" />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea rows={6} {...register("description")} className="input" />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isPublished")}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-600">Published</span>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={isUpdating}
            className="bg-[#2495ef] text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
