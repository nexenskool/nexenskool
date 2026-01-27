import { z } from "zod";

export const createSubServiceSchema = z.object({
  service: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  image: z.string().min(1),
});

export const updateSubServiceSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().optional(),
});
