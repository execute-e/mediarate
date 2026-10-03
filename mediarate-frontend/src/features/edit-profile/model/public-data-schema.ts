import z from "zod";

export const publicDataSchema = z.object({
  displayName: z
    .string()
    .overwrite((s) => s.trim().replace(/\s+/g, " "))
    .min(1, "Required")
    .max(32, "At most 32 characters"),
});

export type PublicDataFormValues = z.infer<typeof publicDataSchema>;
