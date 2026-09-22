import { NEST_API_URL } from "@/src/shared/api/config";
import { REFRESH_TOKEN_COOKIE_NAME } from "@/src/shared/api/const/cookies-const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (refreshToken) {
    await fetch(`${NEST_API_URL}auth/logout`, {
      method: "POST",
      headers: { Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}` },
    }).catch((err) => {
      console.error("Failed to reach Nest /auth/logout:", err);
    });
  }
  const response = NextResponse.json({});

  response.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: "/api/auth" });
  return response;
}
