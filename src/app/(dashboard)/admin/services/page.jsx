"use client";

import {
  useGetServicesQuery,
  useDeleteServiceMutation,
} from "@/store/api/adminServiceApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default function AdminServicesPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetServicesQuery();
  const [deleteService, { isLoading: deleting }] = useDeleteServiceMutation();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteService(id).unwrap();
      toast.success("Service deleted successfully");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load services. Please try again.
      </p>
    );
  }

  const services = data?.services || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-gray-500 text-sm">
            Manage all services shown on your website
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/services/create")}
          className="flex items-center gap-2 bg-[#2495ef] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Empty */}
      {services.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 mb-4">
            No services found. Create your first service.
          </p>
          <button
            onClick={() => router.push("/admin/services/create")}
            className="bg-[#2495ef] text-white px-4 py-2 rounded-lg"
          >
            Create Service
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Mobile + Tablet: Cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {services.map(({ _id, name, shortDesc, longDesc, image }) => (
              <div
                key={_id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-500">Short: {shortDesc}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/admin/services/${_id}/edit`)}
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
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Short Description
                    </p>
                    <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                      {shortDesc}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Long Description
                    </p>
                    <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                      {longDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Desktop: Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full min-w-[1050px] table-fixed">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="p-4 w-[220px]">Name</th>
                  <th className="p-4 w-[170px]">Image</th>
                  <th className="p-4 w-[300px]">Short Desc</th>
                  <th className="p-4 w-[360px]">Long Desc</th>
                  <th className="p-4 w-[120px] text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map(({ _id, name, shortDesc, longDesc, image }) => (
                  <tr
                    key={_id}
                    className="border-t hover:bg-gray-50 transition align-top"
                  >
                    <td className="p-4 font-medium break-words">{name}</td>

                    <td className="p-4">
                      <Image
                        src={image}
                        alt={name}
                        width={160}
                        height={120}
                        className="w-36 h-24 object-cover rounded-md border border-gray-100"
                      />
                    </td>

                    <td className="p-4">
                      <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                        {shortDesc}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                        {longDesc}
                      </p>
                    </td>

                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() =>
                          router.push(`/admin/services/${_id}/edit`)
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
