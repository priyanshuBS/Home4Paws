import { z } from "zod";

export const addPetSchema = z.object({
  name: z.string().trim().min(3).max(50),
  species: z.string().trim(),
  breed: z.string().trim().default("Unknown"),
  age: z.number().min(0),
  gender: z.enum(["male", "female"]),
  description: z
    .string()
    .trim()
    .max(500, "Description can be up to 500 characters")
    .optional(),
  vaccinated: z.boolean().optional().default(false),
  neutered: z.boolean().optional().default(false),
  adopted: z.boolean().optional().default(false),
  adoptionDate: z.coerce.date().optional(),
  location: z.string().trim(),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  owner: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Owner ID must be a valid MongoDB ObjectId"),
});
