"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubServiceSchema } from "@/validators/subService";
import { useCreateSubServiceMutation } from "@/store/api/subServiceApi";
import { useGetServicesQuery } from "@/store/api/adminServiceApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateSubServicePage() {
  const router = useRouter();
  const [createSubService, { isLoading }] = useCreateSubServiceMutation();
  const { data: servicesData, isLoading: loadingServices } =
    useGetServicesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSubServiceSchema),
  });

  const onSubmit = async (data) => {
    if (!data.service) {
      toast.error("Please select a parent service");
      return;
    }

    try {
      await createSubService(data).unwrap();
      toast.success("Sub-service created successfully");
      router.push("/admin/sub-services");
    } catch {
      toast.error("Failed to create sub-service");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Create Sub Service</h1>
          <p className="text-gray-500 text-sm mt-1">
            Add a new sub-service under an existing service
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Service Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Parent Service</label>
            <select
              {...register("service")}
              disabled={loadingServices}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            >
              <option value="">Select a service</option>
              {servicesData?.services?.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-sm text-red-600 mt-1">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Sub Service Title</label>
            <input
              {...register("title")}
              placeholder="e.g. Frontend Development"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description")}
              placeholder="Detailed description of the sub-service"
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2495ef] outline-none"
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              {...register("image")}
              placeholder="https://..."
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
              {isLoading ? "Creating..." : "Create Sub Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
