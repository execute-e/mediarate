export function getProxyHeader(incomingHeaders: Headers) {
  const clientIp = incomingHeaders.get("x-forwarded-for")?.split(",")[0].trim();

  const result: Record<string, string> = {
    "X-Internal-Secret": process.env.INTERNAL_PROXY_SECRET!,
  };
  if (clientIp) result["X-Client-IP"] = clientIp;

  return result;
}
