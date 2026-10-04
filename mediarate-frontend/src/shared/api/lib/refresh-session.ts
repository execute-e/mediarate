import { NEST_API_URL } from "../config";
import { REFRESH_TOKEN_COOKIE_NAME } from "../const/cookies-const";
import { extractCookieValue } from "@/src/shared/lib/cookie/cookie-utils";
import { getProxyHeader } from "./proxy-headers";

export type RefreshSessionResult =
  | { ok: true; accessToken: string; refreshToken: string }
  | { ok: false; status: number; body: unknown; clearCookies: boolean };

export async function refreshSession(
  refreshToken: string,
  incomingHeaders: Headers,
): Promise<RefreshSessionResult> {
  const nestRes = await fetch(`${NEST_API_URL}auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
      ...getProxyHeader(incomingHeaders),
    },
  });

  if (!nestRes.ok) {
    const body = await nestRes.json().catch(() => ({
      statusCode: nestRes.status,
      message: nestRes.statusText || "Upstream error",
      error: "Bad Gateway",
    }));
    // only 401 means the refresh token is invalid; on 429/5xx the session is still alive, keep cookies
    return {
      ok: false,
      status: nestRes.status,
      body,
      clearCookies: nestRes.status === 401,
    };
  }

  const data: { accessToken: string } = await nestRes.json();

  const newRefreshToken = nestRes.headers
    .getSetCookie()
    .map((header) => extractCookieValue(header, REFRESH_TOKEN_COOKIE_NAME))
    .find((value): value is string => value !== null);

  if (!newRefreshToken) {
    return {
      ok: false,
      status: 502,
      body: {
        statusCode: 502,
        message: "Auth service did not return a session",
        error: "Bad Gateway",
      },
      clearCookies: false,
    };
  }

  return { ok: true, accessToken: data.accessToken, refreshToken: newRefreshToken };
}
