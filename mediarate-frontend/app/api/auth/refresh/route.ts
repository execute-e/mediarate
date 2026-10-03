import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/src/shared/api/const/cookies-const";
import { refreshSession } from "@/src/shared/api/lib/refresh-session";

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

  const result = await refreshSession(refreshToken);

  if (!result.ok) {
    const res = NextResponse.json(result.body, { status: result.status });
    if (result.clearCookies) {
      res.cookies.delete({
        name: REFRESH_TOKEN_COOKIE_NAME,
        path: REFRESH_TOKEN_COOKIE_OPTIONS.path,
      });
      res.cookies.delete({
        name: ACCESS_TOKEN_COOKIE_NAME,
        path: ACCESS_TOKEN_COOKIE_OPTIONS.path,
      });
    }
    return res;
  }

  const res = NextResponse.json({ accessToken: result.accessToken });

  res.cookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    result.refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );
  res.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    result.accessToken,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );

  return res;
}
