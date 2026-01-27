"use client";

import {
  useGetTestimonialsQuery,
  useDeleteTestimonialMutation,
  useUpdateTestimonialMutation,
} from "@/store/api/adminTestimonialApi";
import { toast } from "sonner";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function AdminTestimonialsPage() {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();

  const testimonials = data?.testimonials || [];

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", message: "" });

  const [confirmDelete, setConfirmDelete] = useState(null);

  /* ---------------- Status Update ---------------- */
  const handleStatusChange = async (id, value) => {
    try {
      setUpdatingId(id);
      await updateTestimonial({
        id,
        data: { isApproved: value === "approved" },
      }).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------- Edit ---------------- */
  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      name: testimonial.name,
      message: testimonial.message,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTestimonial({
        id: editingTestimonial._id,
        data: editForm,
      }).unwrap();
      toast.success("Testimonial updated");
      setEditingTestimonial(null);
    } catch {
      toast.error("Failed to update testimonial");
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async () => {
    try {
      setDeletingId(confirmDelete._id);
      await deleteTestimonial(confirmDelete._id).unwrap();
      toast.success("Testimonial deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeletingId(null);
    }
  };

  /* ---------------- Loading ---------------- */
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
    return <p className="p-6 text-red-600">Failed to load testimonials</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <p className="text-gray-500 text-sm">
          Manage and approve user testimonials
        </p>
      </div>

      {/* Empty State */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500">No testimonials found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{item.name}</td>

                  <td className="p-4 text-gray-500 line-clamp-2">
                    {item.message}
                  </td>

                  {/* Status Select */}
                  <td className="p-4">
                    <select
                      disabled={updatingId === item._id}
                      value={item.isApproved ? "approved" : "pending"}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    <button
                      onClick={() => setConfirmDelete(item)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- Edit Modal ---------------- */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Edit Testimonial</h2>
              <button onClick={() => setEditingTestimonial(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
                placeholder="Name"
                required
              />

              <textarea
                value={editForm.message}
                onChange={(e) =>
                  setEditForm({ ...editForm, message: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 min-h-[100px]"
                placeholder="Message"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Delete Confirmation Modal ---------------- */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">
              Delete Testimonial
            </h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                disabled={deletingId}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
