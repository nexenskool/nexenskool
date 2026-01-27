import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  shortDesc: z
    .string()
    .min(10, "Short description must be 10 characters long")
    .max(100, "Short descripton cannot exceed 100 characters"),
  longDesc: z.string().min(50, "Long description must be 50 characters long"), 
  image: z.string().min(1, "Image is required"),
});

export const updateServiceSchema = z.object({
  name: z.string().min(3).optional(),
  shortDesc: z.string().min(10).max(100).optional(),
  longDesc: z.string().min(50).optional(),
  image: z.string().optional(),
});
