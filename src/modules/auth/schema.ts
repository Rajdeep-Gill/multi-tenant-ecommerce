import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 63 characters long")
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username must be alphanumeric") // Needs to be unique and only single word, alphanumeric)
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive dashes"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
