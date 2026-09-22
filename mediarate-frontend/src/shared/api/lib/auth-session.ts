import { NextResponse } from "next/server";
import { NEST_API_URL } from "../config";
import { extractCookieValue } from "@/src/shared/lib/cookie/cookie-utils";
import { Schema } from "./api-types";
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE_SECONDS } from "../const/cookies-const";

export async function proxyAuthSession(nestPath: string, dto: unknown) {
  const nestRes = await fetch(`${NEST_API_URL}${nestPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!nestRes.ok) {
    const errorBody = await nestRes.json().catch((err) => {
      console.error(`Failed to parse Nest error from ${nestPath}:`, err);
      return {
        statusCode: nestRes.status,
        message: nestRes.statusText || "Upstream error",
        error: "Bad Gateway",
      };
    });
    return NextResponse.json(errorBody, { status: nestRes.status });
  }

  const data: Schema<"AuthResponse"> = await nestRes.json();

  const refreshTokenFromNest = nestRes.headers
    .getSetCookie()
    .map((header) => extractCookieValue(header, REFRESH_TOKEN_COOKIE_NAME))
    .find((value): value is string => value !== null);

  if (!refreshTokenFromNest) {
    return NextResponse.json(
      {
        statusCode: 502,
        message: "Auth service did not return a session",
        error: "Bad Gateway",
      },
      { status: 502 },
    );
  }

  const response = NextResponse.json(data, { status: nestRes.status });

  response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshTokenFromNest, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });

  return response;
}
