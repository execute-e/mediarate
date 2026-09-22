import { ApiError } from "./api-error";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestOptions = Omit<RequestInit, "method"> & { json?: unknown };

interface JsonFetchWrapperParams {
  baseUrl: string;
  path: string;
  method: HttpMethod;
  options?: RequestOptions;
  isRetry?: boolean;
}

interface AuthOptions {
  getAuthHeader?: () => Record<string, string> | undefined;
  onUnauthorized?: () => Promise<void>;
}

const buildHeaders = (
  json: unknown,
  userHeaders?: HeadersInit,
  authHeader?: Record<string, string>,
) => {
  const headers = new Headers(
    json ? { "Content-Type": "application/json" } : undefined,
  );

  if (authHeader) {
    new Headers(authHeader).forEach((value, key) => headers.set(key, value));
  }

  if (userHeaders) {
    new Headers(userHeaders).forEach((value, key) => headers.set(key, value));
  }

  return headers;
};

async function jsonFetchWrapper<T>(
  { baseUrl, path, method, options = {}, isRetry = false }: JsonFetchWrapperParams,
  authOptions?: AuthOptions,
): Promise<T> {
  const { headers, body, json, ...rest } = options;

  const res = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: buildHeaders(json, headers, authOptions?.getAuthHeader?.()),
    body: json ? JSON.stringify(json) : body,
    method,
  });

  if (res.status === 401 && authOptions?.onUnauthorized && !isRetry) {
    await authOptions.onUnauthorized();
    return jsonFetchWrapper<T>(
      { baseUrl, path, method, options, isRetry: true },
      authOptions,
    );
  }

  if (!res.ok) {
    throw await ApiError.from(res);
  }

  if (res.status === 204) return undefined as T;

  const data = (await res.json()) as T;

  return data;
}

export function createApi(baseUrl: string, authOptions?: AuthOptions) {
  const createMethod = (method: HttpMethod) => {
    return <T>(path: string, options?: RequestOptions) =>
      jsonFetchWrapper<T>({ baseUrl, path, method, options }, authOptions);
  };

  return {
    get: createMethod("GET"),
    post: createMethod("POST"),
    put: createMethod("PUT"),
    patch: createMethod("PATCH"),
    delete: createMethod("DELETE"),
  };
}
