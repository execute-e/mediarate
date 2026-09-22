import z from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email"),
  username: z.string().min(4, "At least 4 characters"),
  password: z.string().min(8, "At least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
