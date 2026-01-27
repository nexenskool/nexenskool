import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  image: z.string().optional(),
  isApproved: z.boolean().optional(),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
