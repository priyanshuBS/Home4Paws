import { z } from "zod";

export const addPetSchema = z.object({
  name: z.string().trim().min(3).max(50),
  species: z.string().trim(),
  breed: z.string().trim().default("Unknown"),
  age: z.coerce.number().min(0), // <-- coercion added
  gender: z.enum(["male", "female"]),
  description: z
    .string()
    .trim()
    .max(500, "Description can be up to 500 characters")
    .optional(),
  vaccinated: z.coerce.boolean().optional().default(false), // <-- coercion
  neutered: z.coerce.boolean().optional().default(false), // <-- coercion
  adopted: z.coerce.boolean().optional().default(false),
  adoptionDate: z.coerce.date().optional(),
  location: z.string().trim(),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  owner: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Owner ID must be a valid MongoDB ObjectId")
    .optional(),
});
