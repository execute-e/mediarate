import { NEST_API_URL } from "@/src/shared/api/config";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/src/shared/api/const/cookies-const";
import { getProxyHeader } from "@/src/shared/api/lib/proxy-headers";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (refreshToken) {
    await fetch(`${NEST_API_URL}auth/logout`, {
      method: "POST",
      headers: {
        Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
        ...getProxyHeader(req.headers),
      },
    }).catch((err) => {
      console.error("Failed to reach Nest /auth/logout:", err);
    });
  }
  const response = NextResponse.json({});

  response.cookies.delete({
    name: REFRESH_TOKEN_COOKIE_NAME,
    path: REFRESH_TOKEN_COOKIE_OPTIONS.path,
  });
  response.cookies.delete({
    name: ACCESS_TOKEN_COOKIE_NAME,
    path: ACCESS_TOKEN_COOKIE_OPTIONS.path,
  });
  return response;
}
