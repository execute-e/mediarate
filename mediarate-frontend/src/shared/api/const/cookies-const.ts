export const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME!;
export const REFRESH_TOKEN_MAX_AGE_SECONDS = Number(
  process.env.REFRESH_TOKEN_MAX_AGE_SECONDS,
);
export const ACCESS_TOKEN_COOKIE_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME!;
export const ACCESS_TOKEN_MAX_AGE_SECONDS = Number(
  process.env.ACCESS_TOKEN_MAX_AGE_SECONDS,
);

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
} as const;
export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
} as const;
