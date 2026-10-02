"use client";

import { SessionUser } from "@/src/entities/session";
import { UserAvatar } from "@/src/entities/user";
import { ImageUpload } from "@/src/shared/components/image-upload/image-upload";
import { cn } from "cn";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import { PROFILE_IMAGE_ACCEPT } from "../model/profile-image-schema";

interface AvatarUploadProps {
  user: SessionUser;
  className?: string;
}

export function AvatarUpload({ user, className }: AvatarUploadProps) {
  const { mutate, isPending } = useUpdateProfileImage("avatar");

  return (
    <ImageUpload
      label="Change avatar"
      accept={PROFILE_IMAGE_ACCEPT}
      isLoading={isPending}
      onFileSelect={(file) => mutate(file)}
      className={cn("size-24 rounded-full", className)}
    >
      <UserAvatar userData={user} className="size-full" />
    </ImageUpload>
  );
}
