import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PublicDataFormValues,
  publicDataSchema,
} from "../model/public-data-schema";
import { FieldGroup } from "@/src/shared/components/ui/field";
import { FormTextField } from "@/src/shared/components/form/form-text-field";
import { Button } from "@/src/shared/components/ui/button";
import { SessionUser } from "@/src/entities/session";

export function PublicDataForm({ user }: { user: SessionUser }) {
  const { mutate, isPending } = useUpdateProfile();
  const form = useForm<PublicDataFormValues>({
    resolver: zodResolver(publicDataSchema),
    defaultValues: { displayName: user.displayName },
  });

  const onSubmit = (values: PublicDataFormValues) => {
    // send only the fields that were changed
    const dirty = form.formState.dirtyFields;
    const dto = Object.fromEntries(
      Object.entries(values).filter(
        ([key]) => dirty[key as keyof typeof dirty],
      ),
    );
    mutate(dto, { onSuccess: () => form.reset(values) });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormTextField
          control={form.control}
          name="displayName"
          label="Display name"
        />
        <Button type="submit" disabled={!form.formState.isDirty || isPending}>
          Save
        </Button>
      </FieldGroup>
    </form>
  );
}
