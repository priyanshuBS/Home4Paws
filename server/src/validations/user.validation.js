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
