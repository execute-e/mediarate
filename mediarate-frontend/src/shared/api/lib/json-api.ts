import { MaybePromise } from "../../types/promises-types";
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
  getToken: () => MaybePromise<string | null | undefined>;
  onUnauthorized?: () => MaybePromise<string | null | undefined>;
  // extra headers added to every request (e.g. client ip when requesting from the server)
  getHeaders?: () => MaybePromise<HeadersInit | undefined>;
}

const buildHeaders = (
  json: unknown,
  userHeaders?: HeadersInit,
  token?: string | null,
  extraHeaders?: HeadersInit,
) => {
  const headers = new Headers();
  if (json !== undefined) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (extraHeaders) {
    new Headers(extraHeaders).forEach((value, key) => headers.set(key, value));
  }
  if (userHeaders) {
    new Headers(userHeaders).forEach((value, key) => headers.set(key, value));
  }

  return headers;
};

async function jsonFetchWrapper<T>(
  {
    baseUrl,
    path,
    method,
    options = {},
    isRetry = false,
  }: JsonFetchWrapperParams,
  auth?: AuthOptions,
): Promise<T> {
  const { headers, body, json, ...rest } = options;
  const token = await auth?.getToken();
  const extraHeaders = await auth?.getHeaders?.();

  const res = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: buildHeaders(json, headers, token, extraHeaders),
    body: json ? JSON.stringify(json) : body,
    method,
  });

  if (res.status === 401 && auth?.onUnauthorized && !isRetry) {
    const freshToken = await auth.onUnauthorized();
    if (freshToken) {
      return jsonFetchWrapper<T>(
        { baseUrl, path, method, options, isRetry: true },
        auth,
      );
    }
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
