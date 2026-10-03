import { useSessionActions } from "@/src/entities/session";
import { updateAvatar, updateBanner, UserApi } from "@/src/entities/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileImageSchema } from "../model/profile-image-schema";

const uploaders = {
  avatar: updateAvatar,
  banner: updateBanner,
};

export function useUpdateProfileImage(type: keyof typeof uploaders) {
  const queryClient = useQueryClient();
  const { invalidateSession } = useSessionActions();

  const { mutate, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const result = profileImageSchema.safeParse(file);
      if (!result.success) {
        throw new Error(result.error.issues[0].message);
      }
      return uploaders[type](file);
    },
    // returning the promise keeps isPending until the fresh profile is loaded
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [UserApi.baseKey] }),
        invalidateSession(),
      ]),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
}
