"use client";

import { useSession } from "@/src/entities/session";
import {
  AvatarUpload,
  BannerUpload,
  PublicDataForm,
} from "@/src/features/edit-profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { DialogProps } from "radix-ui/dialog";

export function EditProfileDialog({ ...props }: DialogProps) {
  const session = useSession();

  if (!session) return null;

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Click on the banner or avatar to change it
          </DialogDescription>
        </DialogHeader>
        <div className="relative mb-12">
          <BannerUpload user={session} />
          <AvatarUpload
            user={session}
            className="absolute -bottom-12 left-4 border-4 border-popover"
          />
        </div>
        <PublicDataForm user={session} />
      </DialogContent>
    </Dialog>
  );
}
