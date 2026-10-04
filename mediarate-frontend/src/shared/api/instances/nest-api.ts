import { NEST_PUBLIC_API_URL } from "../config";
import { createApi } from "../lib/json-api";
import { nextApi } from "./next-api";
import { useAuthStore } from "../../auth";
import { ROUTES } from "../../const/routes";
import { ACCESS_TOKEN_COOKIE_NAME } from "../const/cookies-const";
import { getProxyHeader } from "../lib/proxy-headers";

let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken() {
  refreshPromise ??= nextApi
    .post<{ accessToken: string }>(ROUTES.apiRefresh())
    .then(({ accessToken }) => {
      useAuthStore.getState().setAccessToken(accessToken);
      return accessToken;
    })
    .catch(() => {
      useAuthStore.getState().clearAccessToken();
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export const nestApi = createApi(NEST_PUBLIC_API_URL, {
  getToken: async () => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    }
    return useAuthStore.getState().accessToken;
  },
  onUnauthorized: () =>
    typeof window === "undefined" ? null : refreshAccessToken(),
  // SSR requests come to Nest from the Next server ip, so forward the real client ip
  getHeaders: async () => {
    if (typeof window !== "undefined") return undefined;
    const { headers } = await import("next/headers");
    return getProxyHeader(await headers());
  },
});
