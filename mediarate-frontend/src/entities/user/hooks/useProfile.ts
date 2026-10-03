import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../api/user-api";

export function useProfile(username: string) {
  const { data, isLoading, error } = useQuery({
    ...UserApi.getProfileQueryOptions(username),
  });

  return { data, isLoading, error };
}
