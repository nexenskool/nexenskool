"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      reset();
      alert("Message sent successfully!");
    } catch (error) {
      alert("Failed to send message");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-900">Get in touch</h2>
        <p className="text-sm text-gray-500">
          We usually respond within 24 hours.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none transition
            focus:ring-2 focus:ring-[#3AB1F3]/30 focus:border-[#3AB1F3]
            ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Company <span className="text-gray-400">(optional)</span>
        </label>
        <input
          {...register("company")}
          placeholder="Acme Inc."
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition
                     focus:ring-2 focus:ring-[#3AB1F3]/30 focus:border-[#3AB1F3]"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none transition
            focus:ring-2 focus:ring-[#3AB1F3]/30 focus:border-[#3AB1F3]
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register("phone")}
          placeholder="+880 1XXXXXXXXX"
          className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none transition
            focus:ring-2 focus:ring-[#3AB1F3]/30 focus:border-[#3AB1F3]
            ${errors.phone ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your project..."
          className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none transition resize-none
            focus:ring-2 focus:ring-[#3AB1F3]/30 focus:border-[#3AB1F3]
            ${errors.message ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#3AB1F3] py-2.5 font-medium text-white
                   transition hover:bg-[#2599DA]
                   focus:ring-2 focus:ring-[#3AB1F3]/40
                   disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
