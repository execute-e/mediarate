import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/src/shared/api/const/cookies-const";
import { refreshSession } from "@/src/shared/api/lib/refresh-session";

export async function proxy(request: NextRequest) {
  if (request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  if (!refreshToken) {
    return NextResponse.next();
  }
  const result = await refreshSession(refreshToken, request.headers);

  if (!result.ok) {
    const response = NextResponse.next();

    if (result.clearCookies) {
      response.cookies.delete({
        name: REFRESH_TOKEN_COOKIE_NAME,
        path: REFRESH_TOKEN_COOKIE_OPTIONS.path,
      });
      response.cookies.delete({
        name: ACCESS_TOKEN_COOKIE_NAME,
        path: ACCESS_TOKEN_COOKIE_OPTIONS.path,
      });
    }

    return response;
  }

  // reflect the refreshed tokens onto the current request so the Server
  // Component rendered right after this proxy run already sees them
  request.cookies.set(ACCESS_TOKEN_COOKIE_NAME, result.accessToken);
  request.cookies.set(REFRESH_TOKEN_COOKIE_NAME, result.refreshToken);

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  response.cookies.set(
    ACCESS_TOKEN_COOKIE_NAME,
    result.accessToken,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE_NAME,
    result.refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
