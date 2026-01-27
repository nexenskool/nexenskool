"use client";

import {
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
} from "@/store/api/testimonialApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

export default function TestimonialsPage() {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const [createTestimonial, { isLoading: isSubmitting }] =
    useCreateTestimonialMutation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await createTestimonial(formData).unwrap();
      toast.success("Testimonial submitted for approval!");
      reset();
      setSubmitted(true);
    } catch (err) {
      toast.error("Failed to submit testimonial");
    }
  };

  const testimonials = data?.testimonials?.filter((t) => t.isApproved) || [];

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">What Our Users Say</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Real experiences shared by students and professionals who trust us
        </p>
      </div>

      {/* Loading / Error */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-red-600">Failed to load testimonials</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-gray-500">
          No testimonials available yet
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
            >
              <p className="text-gray-700 mb-6 leading-relaxed">
                “{item.message}”
              </p>
              <div className="mt-auto flex items-center gap-3">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#2495ef]/10 text-[#2495ef] flex items-center justify-center font-bold">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {item.designation && (
                    <p className="text-sm text-gray-500">{item.designation}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Form */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Share Your Experience
        </h2>
        {submitted && (
          <p className="text-green-600 mb-4 text-center">
            Thank you! Your testimonial will be reviewed.
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("designation")}
            placeholder="Your Designation (Optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
          />

          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Testimonial"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
          />
          {errors.message && (
            <p className="text-red-600 text-sm">{errors.message.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2495ef] text-white font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      </div>
    </section>
  );
}
