import { z } from "zod";
import { email } from "zod/v4";

export const signupUserSchema = z.object({
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
});
