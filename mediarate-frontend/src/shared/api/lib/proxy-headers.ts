// headers for server-side requests to Nest: the secret proves the request comes from our Next,
// so Nest can trust X-Client-IP and rate limit by the real client instead of the Next server ip
export function getProxyHeader(incomingHeaders: Headers) {
  // Vercel overwrites x-forwarded-for with the real client ip (can't be spoofed there).
  // Check this guarantee before deploying Next anywhere else
  const clientIp = incomingHeaders.get("x-forwarded-for")?.split(",")[0].trim();

  const result: Record<string, string> = {
    "X-Internal-Secret": process.env.INTERNAL_PROXY_SECRET!,
  };
  if (clientIp) result["X-Client-IP"] = clientIp;

  return result;
}
