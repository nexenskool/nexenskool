"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema } from "@/validators/blog";
import { useCreateBlogMutation } from "@/store/api/adminBlogApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      isPublished: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await createBlog(data).unwrap();
      toast.success("Blog created successfully");
      router.push("/admin/blogs");
    } catch {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Blog</h1>
        <p className="text-gray-500 text-sm">Add a new blog post</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input {...register("title")} className="input" />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        {/* Subtitle */}
        <div>
          <label className="label">Subtitle</label>
          <input {...register("subTitle")} className="input" />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <input {...register("category")} className="input" />
          {errors.category && (
            <p className="error">{errors.category.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL</label>
          <input {...register("image")} className="input" />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea rows={6} {...register("description")} className="input" />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        {/* Publish */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isPublished")}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-600">Publish immediately</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            className="bg-[#2495ef] text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
