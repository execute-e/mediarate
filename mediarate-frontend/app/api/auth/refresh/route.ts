import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NEST_API_URL } from "@/src/shared/api/config";
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "@/src/shared/api/const/cookies-const";
import { extractCookieValue } from "@/src/shared/lib/cookie/cookie-utils";

export async function POST() {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        statusCode: 401,
        message: "Refresh token not found",
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const nestRes = await fetch(`${NEST_API_URL}auth/refresh`, {
    method: "POST",
    headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` },
  });

  if (!nestRes.ok) {
    const errorBody = await nestRes.json().catch(() => ({
      statusCode: nestRes.status,
      message: nestRes.statusText || "Upstream error",
      error: "Bad Gateway",
    }));
    const res = NextResponse.json(errorBody, { status: nestRes.status });
    res.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: "/api/auth" });
    return res;
  }

  const data: { accessToken: string } = await nestRes.json();

  const newRefreshToken = nestRes.headers
    .getSetCookie()
    .map((header) => extractCookieValue(header, REFRESH_TOKEN_COOKIE_NAME))
    .find((value): value is string => value !== null);

  if (!newRefreshToken) {
    return NextResponse.json(
      {
        statusCode: 502,
        message: "Auth service did not return a session",
        error: "Bad Gateway",
      },
      { status: 502 },
    );
  }

  const res = NextResponse.json(data);

  res.cookies.set(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });

  return res;
}
