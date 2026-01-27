"use client";

import {
  useGetScholarshipsQuery,
  useDeleteScholarshipMutation,
} from "@/store/api/scholarshipApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminScholarshipsPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetScholarshipsQuery();

  const [deleteScholarship] = useDeleteScholarshipMutation();

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      setDeletingId(id);
      await deleteScholarship(id).unwrap();
      toast.success("Scholarship deleted");
    } catch {
      toast.error("Failed to delete scholarship");
    } finally {
      setDeletingId(null);
    }
  };

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
    return <p className="p-6 text-red-600">Failed to load scholarships</p>;
  }

  const scholarships = data?.scholarships || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Scholarships</h1>
          <p className="text-gray-500 text-sm">
            Manage all scholarship listings
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/scholarships/create")}
          className="flex items-center gap-2 bg-[#2495ef] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          <Plus size={18} />
          Add Scholarship
        </button>
      </div>

      {/* Empty state */}
      {scholarships.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 mb-4">No scholarships found</p>
          <button
            onClick={() => router.push("/admin/scholarships/create")}
            className="bg-[#2495ef] text-white px-4 py-2 rounded-lg"
          >
            Create Scholarship
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Degrees</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {scholarships.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{item.name}</td>

                  <td className="p-4 text-gray-500">{item.location}</td>

                  <td className="p-4 text-gray-500">
                    {item.degrees.join(", ")}
                  </td>

                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/scholarships/${item._id}/edit`)
                      }
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      disabled={deletingId === item._id}
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
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
      )}
    </div>
  );
}
