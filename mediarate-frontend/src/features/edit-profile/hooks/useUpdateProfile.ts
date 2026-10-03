import { useSessionActions } from "@/src/entities/session";
import { updateProfile, UserApi } from "@/src/entities/user/api/user-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { invalidateSession } = useSessionActions();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      invalidateSession();
      queryClient.invalidateQueries({ queryKey: [UserApi.baseKey] });
      toast.success("Profile was successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
