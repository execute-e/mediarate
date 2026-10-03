"use client";

import { SessionUser } from "@/src/entities/session";
import { ImageUpload } from "@/src/shared/components/image-upload/image-upload";
import { cn } from "cn";
import Image from "next/image";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import { PROFILE_IMAGE_ACCEPT } from "../model/profile-image-schema";

interface BannerUploadProps {
  user: SessionUser;
  className?: string;
}

export function BannerUpload({ user, className }: BannerUploadProps) {
  const { mutate, isPending } = useUpdateProfileImage("banner");

  return (
    <ImageUpload
      label="Change banner"
      accept={PROFILE_IMAGE_ACCEPT}
      isLoading={isPending}
      onFileSelect={(file) => mutate(file)}
      className={cn("aspect-3/1 w-full rounded-md bg-muted", className)}
    >
      {user.bannerUrl && (
        <Image
          src={user.bannerUrl}
          alt=""
          fill
          sizes="512px"
          className="object-cover"
        />
      )}
    </ImageUpload>
  );
}
