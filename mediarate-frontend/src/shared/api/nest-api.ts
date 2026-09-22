import { NEST_PUBLIC_API_URL } from "./config";
import { createApi } from "./lib/json-api";
import { nextApi } from "./next-api";
import { useAuthStore } from "../auth";
import { ROUTES } from "../const/routes";

let refreshPromise: Promise<void> | null = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = nextApi
      .post<{ accessToken: string }>(ROUTES.apiRefresh())
      .then(({ accessToken }) => {
        useAuthStore.getState().setAccessToken(accessToken);
      })
      .catch((err) => {
        useAuthStore.getState().clearAccessToken();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export const nestApi = createApi(NEST_PUBLIC_API_URL, {
  getAuthHeader: () => {
    const token = useAuthStore.getState().accessToken;
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  },
  onUnauthorized: refreshAccessToken,
});