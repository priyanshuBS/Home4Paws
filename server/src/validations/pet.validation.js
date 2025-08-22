import { z } from "zod";

export const addPetSchema = z.object({
  name: z.string().trim().min(3).max(50),
  category: z.string().trim(),
  breed: z.string().trim().default("Unknown"),
  age: z.coerce.number().min(0),
  gender: z.enum(["male", "female"]),
  description: z.string().trim().max(500).optional(),
  vaccinated: z.coerce.boolean().optional().default(false),
  neutered: z.coerce.boolean().optional().default(false),
  adopted: z.coerce.boolean().optional().default(false),
  adoptionDate: z.coerce.date().optional(),
  location: z.string().trim(),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  owner: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Owner ID must be a valid MongoDB ObjectId")
    .optional(),
});
