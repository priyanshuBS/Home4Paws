import { z } from "zod";
import { email } from "zod/v4";

export const signupUserSchema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
  role: z.enum(["customer", "owner", "delivery", "admin"]),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
  role: z.enum(["customer", "owner", "delivery", "admin"]),
});

export const updateUserProfileSchema = z
  .object({
    name: z.string().min(3).max(50).optional(),
    phoneNumber: z.string().min(10).max(15).optional(),
    location: z
      .object({
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        zip: z.string().optional(),
        coordinates: z.tuple([z.number(), z.number()]).optional(),
      })
      .optional(),
  })
  .strict();
