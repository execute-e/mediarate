"use client";

import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "../model/register-schema";
import { FieldGroup } from "@/src/shared/components/ui/field";
import { FormTextField } from "@/src/shared/components/form/form-text-field";
import { Typography } from "@/src/shared/components/typography";
import { Button } from "@/src/shared/components/ui/button";
import { capitalize } from "@/src/shared/lib/utils/string-utils";

export function RegisterForm() {
  const { mutate: register, isPending, error } = useRegister();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", username: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit((values) => register(values))}>
      <FieldGroup>
        <FormTextField
          control={form.control}
          name="username"
          label="Username"
          autoComplete="username"
          placeholder="Your username..."
        />
        <FormTextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Your email..."
          autoComplete="email"
        />
        <FormTextField
          control={form.control}
          name="password"
          label="Password"
          autoComplete="new-password"
          type="password"
          placeholder="Your password..."
        />

        {error && (
          <Typography variant={"p"} className="text-destructive">
            {capitalize(error.message)}
          </Typography>
        )}

        <Button type="submit" disabled={isPending}>
          Create account
        </Button>
      </FieldGroup>
    </form>
  );
}
