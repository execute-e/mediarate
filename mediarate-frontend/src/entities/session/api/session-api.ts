import { nextApi } from "@/src/shared/api/next-api";
import { useAuthStore } from "@/src/shared/auth";
import { ROUTES } from "@/src/shared/const/routes";
import { AuthResponse, LoginPayload, RegisterPayload, SessionUser } from "../model/types";

export async function register(payload: RegisterPayload): Promise<SessionUser> {
  const { user, accessToken } = await nextApi.post<AuthResponse>(ROUTES.apiRegister(), {
    json: payload,
  });
  useAuthStore.getState().setAccessToken(accessToken);
  return user;
}

export async function login(payload: LoginPayload): Promise<SessionUser> {
  const { user, accessToken } = await nextApi.post<AuthResponse>(ROUTES.apiLogin(), {
    json: payload,
  });
  useAuthStore.getState().setAccessToken(accessToken);
  return user;
}

export async function logout() {
  await nextApi.post(ROUTES.apiLogout());
  useAuthStore.getState().clearAccessToken();
}
