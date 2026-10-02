import { nestApi } from "@/src/shared/api/instances/nest-api";
import { nextApi } from "@/src/shared/api/instances/next-api";
import { useAuthStore } from "@/src/shared/auth";
import { BACKEND_ROUTES } from "@/src/shared/const/backend-routes";
import { ROUTES } from "@/src/shared/const/routes";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  SessionUser,
} from "../../../shared/api/types/types";

export async function register(payload: RegisterPayload): Promise<SessionUser> {
  const { user, accessToken } = await nextApi.post<AuthResponse>(
    ROUTES.apiRegister(),
    {
      json: payload,
    },
  );
  useAuthStore.getState().setAccessToken(accessToken);
  return user;
}

export async function login(payload: LoginPayload): Promise<SessionUser> {
  const { user, accessToken } = await nextApi.post<AuthResponse>(
    ROUTES.apiLogin(),
    {
      json: payload,
    },
  );
  useAuthStore.getState().setAccessToken(accessToken);
  return user;
}

export async function logout() {
  await nextApi.post(ROUTES.apiLogout());
  useAuthStore.getState().clearAccessToken();
}

export async function getSession(): Promise<SessionUser | null> {
  return nestApi.get<SessionUser>(BACKEND_ROUTES.getMe());
}
