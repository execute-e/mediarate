export { cn } from "cn";

export function extractCookieValue(setCookieHeader: string, name: string) {
  const match = setCookieHeader.match(new RegExp(`^${name}=([^;]+)`));
  return match?.[1] ?? null;
}