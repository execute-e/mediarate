import { NextResponse } from "next/server";
import { NEST_API_URL } from "../config";
import { extractCookieValue } from "@/src/shared/lib/cookie/cookie-utils";
import { Schema } from "./api-types";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "../const/cookies-const";
import { getProxyHeader } from "./proxy-headers";

export async function proxyAuthSession(
  nestPath: string,
  dto: unknown,
  incomingHeaders: Headers,
) {
  const nestRes = await fetch(`${NEST_API_URL}${nestPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getProxyHeader(incomingHeaders),
    },
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

  const accessTokenFromNest = data.accessToken;

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

  response.cookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    refreshTokenFromNest,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );

  response.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    accessTokenFromNest,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );

  return response;
}
