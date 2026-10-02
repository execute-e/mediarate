import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "../api/session-api";
import { SessionUser } from "@/src/shared/api/types/types";
import { useAuthStore } from "@/src/shared/auth";

export const SESSION_QUERY_KEY = ["session"] as const;

export const useSession = (initialData?: SessionUser | null) => {
  const { data } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => {
      if (useAuthStore.getState().accessToken) {
        return getSession();
      }
      return null;
    },
    retry: false,
    initialData,
  });

  return data;
};

export const useSessionActions = () => {
  const queryClient = useQueryClient();

  return {
    setSession: (user: SessionUser) =>
      queryClient.setQueryData(SESSION_QUERY_KEY, user),
    clearSession: () => queryClient.setQueryData(SESSION_QUERY_KEY, null),
    invalidateSession: () =>
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY }),
  };
};
