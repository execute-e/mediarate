import { logout, useSessionActions } from "@/src/entities/session";
import { ROUTES } from "@/src/shared/const/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const { clearSession } = useSessionActions();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
      router.push(ROUTES.home());
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { mutate, isPending, error };
}
