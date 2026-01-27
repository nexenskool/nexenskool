import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(2, "Category is required"),
  image: z.string().url("Invalid image URL"),
  isPublished: z.boolean().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
