import { z } from "zod";

export const createScholarshipSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string(),
  degrees: z.array(z.string().min(1)).min(1, "At least one degree required"),
  location: z.string().min(2),
  benefits: z.string().min(1, "At least one benefit required"),
  description: z.string().min(10),
  applyUrl: z.string().url("Invalid application URL").optional(),
});

export const updateScholarshipSchema = createScholarshipSchema.partial();
