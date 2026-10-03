import { PublicDataFormValues } from "@/src/features/edit-profile/model/public-data-schema";
import { nestApi } from "@/src/shared/api/instances/nest-api";
import { Schema } from "@/src/shared/api/lib/api-types";
import { SessionUser } from "@/src/shared/api/types/types";
import { BACKEND_ROUTES } from "@/src/shared/const/backend-routes";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const UserApi = {
  baseKey: "user",
  getProfileQueryOptions: (username: string) =>
    queryOptions({
      queryKey: [UserApi.baseKey, "profile", username],
      queryFn: () => getProfile(username),
      placeholderData: keepPreviousData,
    }),
};

export async function getProfile(username: string) {
  return nestApi.get<SessionUser>(BACKEND_ROUTES.profile(username));
}

function toFormData(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

export async function updateAvatar(file: File) {
  return nestApi.patch<Schema<"AvatarResponseDto">>(
    BACKEND_ROUTES.updateAvatar(),
    { body: toFormData(file) },
  );
}

export async function updateBanner(file: File) {
  return nestApi.patch<Schema<"BannerResponseDto">>(
    BACKEND_ROUTES.updateBanner(),
    { body: toFormData(file) },
  );
}

export async function updateProfile(dto: Partial<PublicDataFormValues>) {
  return nestApi.patch(BACKEND_ROUTES.updateProfile(), { json: dto });
}
