import { Schema } from "@/src/shared/api/lib/api-types";

export type AuthResponse = Schema<"AuthResponse">;
export type LoginPayload = Schema<"LoginDto">;
export type RegisterPayload = Schema<"CreateUserDto">;
export type SessionUser = AuthResponse["user"];
