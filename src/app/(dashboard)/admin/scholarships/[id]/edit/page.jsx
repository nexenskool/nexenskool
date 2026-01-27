"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetScholarshipByIdQuery,
  useUpdateScholarshipMutation,
} from "@/store/api/scholarshipApi";
import { updateScholarshipSchema } from "@/validators/scholarship";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function EditScholarshipPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetScholarshipByIdQuery(id);

  const [updateScholarship, { isLoading: updating }] =
    useUpdateScholarshipMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateScholarshipSchema),
  });

  useEffect(() => {
    if (data?.scholarship) {
      reset({
        ...data.scholarship,
        degrees: data.scholarship.degrees.join(", ") || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      degrees: formData.degrees
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
    };

    try {
      await updateScholarship({
        id,
        data: payload,
      }).unwrap();

      toast.success("Scholarship updated");
      router.push("/admin/scholarships");
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }
  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load scholarship</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 border rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Scholarship</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-xl p-6 space-y-5"
      >
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Image URL"
          {...register("image")}
          error={errors.image?.message}
        />
        <Input
          label="Location"
          {...register("location")}
          error={errors.location?.message}
        />

        <Textarea
          label="Degrees (comma separated)"
          {...register("degrees")}
          error={errors.degrees?.message}
        />

        <Textarea
          label="Benefits"
          {...register("benefits")}
          error={errors.benefits?.message}
        />

        <Textarea
          label="Description"
          {...register("description")}
          error={errors.description?.message}
        />

        <Input
          label="Apply URL"
          {...register("applyUrl")}
          error={errors.applyUrl?.message}
        />

        <div className="flex gap-3">
          <button
            disabled={updating}
            className="bg-[#2495ef] text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2495ef]"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function Textarea({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        rows={4}
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2495ef]"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
