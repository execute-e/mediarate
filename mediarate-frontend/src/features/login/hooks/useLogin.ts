import { login, useSessionActions } from "@/src/entities/session";
import { ROUTES } from "@/src/shared/const/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { setSession } = useSessionActions();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setSession(user);
      router.push(ROUTES.home());
    },
  });

  return { mutate, isPending, error };
}
