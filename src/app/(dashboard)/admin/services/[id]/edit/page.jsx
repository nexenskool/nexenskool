"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/store/api/adminServiceApi";
import { updateServiceSchema } from "@/validators/service";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data,
    isLoading: fetching,
    isError,
  } = useGetServiceByIdQuery(id);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateServiceSchema),
  });

  useEffect(() => {
    if (data?.service) {
      reset({
        name: data.service.name,
        shortDesc: data.service.shortDesc,
        longDesc: data.service.longDesc,
        // icon: data.service.icon,
        image: data.service.image,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateService({ id, data: formData }).unwrap();
      toast.success("Service updated successfully");
      router.push("/admin/services");
    } catch {
      toast.error("Failed to update service");
    }
  };

  /* 🔹 Loading state */
  if (fetching) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* 🔹 Error state */
  if (isError || !data?.service) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-red-600 mb-4">
          Failed to load service details
        </p>
        <button
          onClick={() => router.push("/admin/services")}
          className="bg-[#2495ef] text-white px-4 py-2 rounded-lg"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Edit Service</h1>
          <p className="text-gray-500 text-sm mt-1">
            Update service information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              Service Name
            </label>
            <input
              {...register("name")}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-medium">
              Short Description
            </label>
            <textarea
              {...register("shortDesc")}
              rows={2}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.shortDesc && (
              <p className="text-sm text-red-600 mt-1">
                {errors.shortDesc.message}
              </p>
            )}
          </div>

          {/* Long Description */}
          <div>
            <label className="block mb-1 font-medium">
              Long Description
            </label>
            <textarea
              {...register("longDesc")}
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.longDesc && (
              <p className="text-sm text-red-600 mt-1">
                {errors.longDesc.message}
              </p>
            )}
          </div>


          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">
              Image URL
            </label>
            <input
              {...register("image")}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.image && (
              <p className="text-sm text-red-600 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2495ef] text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
            >
              {isLoading ? "Updating..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
