"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/src/shared/components/ui/field";
import { FormTextField } from "@/src/shared/components/form/form-text-field";
import { Typography } from "@/src/shared/components/typography";
import { Button } from "@/src/shared/components/ui/button";
import { capitalize } from "@/src/shared/lib/utils/string-utils";
import { useLogin } from "../hooks/useLogin";
import { LoginFormValues, loginSchema } from "../model/login-schema";

export function LoginForm() {
  const { mutate: register, isPending, error } = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
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
          Log in
        </Button>
      </FieldGroup>
    </form>
  );
}
