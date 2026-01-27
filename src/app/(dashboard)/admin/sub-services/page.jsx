"use client";

import {
  useGetSubServicesQuery,
  useDeleteSubServiceMutation,
} from "@/store/api/subServiceApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default function AdminSubServicesPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetSubServicesQuery();
  const [deleteSubService, { isLoading: deleting }] =
    useDeleteSubServiceMutation();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this sub-service?")) return;

    try {
      await deleteSubService(id).unwrap();
      toast.success("Sub-service deleted successfully");
    } catch {
      toast.error("Failed to delete sub-service");
    }
  };

  /* 🔹 Loading */
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  /* 🔹 Error */
  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load sub-services. Please try again.
      </p>
    );
  }

  const subServices = data?.data || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sub Services</h1>
          <p className="text-gray-500 text-sm">
            Manage all sub-services under each service
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/sub-services/create")}
          className="flex items-center gap-2 bg-[#2495ef] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Sub Service
        </button>
      </div>

      {/* Empty State */}
      {subServices.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 mb-4">
            No sub-services found. Create your first one.
          </p>
          <button
            onClick={() => router.push("/admin/sub-services/create")}
            className="bg-[#2495ef] text-white px-4 py-2 rounded-lg"
          >
            Create Sub Service
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Mobile + Tablet (Cards) */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {subServices.map(({ _id, title, description, image, service }) => (
              <div
                key={_id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">
                      {service?.name || "—"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/sub-services/${_id}/edit`)
                      }
                      className="text-blue-600 hover:underline"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      disabled={deleting}
                      onClick={() => handleDelete(_id)}
                      className="text-red-600 hover:underline disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-44 rounded-lg overflow-hidden border border-gray-100">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw"
                  />
                </div>

                <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ Desktop (Table) */}
          <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="p-4 w-[220px]">Title</th>
                  <th className="p-4 w-[180px]">Service</th>
                  <th className="p-4 w-[420px]">Description</th>
                  <th className="p-4 w-[160px]">Image</th>
                  <th className="p-4 w-[120px] text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {subServices.map(
                  ({ _id, title, description, image, service }) => (
                    <tr
                      key={_id}
                      className="border-t hover:bg-gray-50 transition align-top"
                    >
                      <td className="p-4 font-medium break-words">{title}</td>
                      <td className="p-4 break-words">
                        {service?.name || "—"}
                      </td>

                      <td className="p-4">
                        <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                          {description}
                        </p>
                      </td>

                      <td className="p-4">
                        <Image
                          src={image}
                          alt={title}
                          width={140}
                          height={100}
                          className="w-32 h-20 object-cover rounded-md border border-gray-100"
                        />
                      </td>

                      <td className="p-4 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() =>
                            router.push(`/admin/sub-services/${_id}/edit`)
                          }
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          disabled={deleting}
                          onClick={() => handleDelete(_id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
