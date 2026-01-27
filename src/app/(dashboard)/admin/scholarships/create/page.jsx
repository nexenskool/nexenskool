"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateScholarshipMutation } from "@/store/api/scholarshipApi";
import { createScholarshipSchema } from "@/validators/scholarship";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateScholarshipPage() {
  const router = useRouter();

  const [createScholarship, { isLoading }] = useCreateScholarshipMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createScholarshipSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createScholarship(data).unwrap();
      toast.success("Scholarship created successfully");
      router.push("/admin/scholarships");
    } catch {
      toast.error("Failed to create scholarship");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Add Scholarship</h1>

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
          {...register("degrees", {
            setValueAs: (v) => v.split(",").map((d) => d.trim()),
          })}
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
            disabled={isLoading}
            className="bg-[#2495ef] text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            Create
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
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
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
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
