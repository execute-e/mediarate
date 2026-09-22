import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(4, "At least 4 characters"),
  password: z.string().min(8, "At least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
