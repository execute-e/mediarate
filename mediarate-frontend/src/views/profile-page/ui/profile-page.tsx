"use client";

import { useSession } from "@/src/entities/session";
import { useProfile, UserAvatar } from "@/src/entities/user";
import { Typography } from "@/src/shared/components/typography";
import { Button } from "@/src/shared/components/ui/button";
import { Skeleton } from "@/src/shared/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import { EditProfileDialog } from "./edit-profile-dialog";

interface ProfilePageProps {
  username: string;
}

export function ProfilePage({ username }: ProfilePageProps) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { data, isLoading, error } = useProfile(username);
  const session = useSession();
  const isOwner = !!data && data.id === session?.id;

  return (
    <div className="mt-5">
      {data && (
        <>
          <div className="flex flex-col gap-12 sm:gap-15">
            <div className="relative bg-muted w-full aspect-3/1 max-h-70 rounded-sm border border-border">
              {data.bannerUrl && (
                <Image
                  src={data.bannerUrl}
                  alt=""
                  fill
                  sizes="100vw"
                  loading="eager"
                  className="object-cover rounded-sm"
                />
              )}
              <UserAvatar
                userData={data}
                className="size-20 sm:size-35 absolute -bottom-10 left-4 sm:left-5"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 ml-4 sm:ml-10">
              <div className="flex flex-wrap items-baseline gap-x-6 wrap-anywhere">
                <Typography variant={"h2"}>{data.displayName}</Typography>
                <Typography variant={"p"}>{`@${data.username}`}</Typography>
              </div>
              {isOwner && (
                <Button
                  variant={"outline"}
                  onClick={() => setEditModalOpen(true)}
                >
                  Edit profile
                </Button>
              )}
            </div>
          </div>
          <EditProfileDialog
            open={isEditModalOpen}
            onOpenChange={setEditModalOpen}
          />
        </>
      )}
      {isLoading && (
        <Skeleton className="w-full aspect-3/1 max-h-70"></Skeleton>
      )}
      {error && <Typography>{`Error: ${error.message}`}</Typography>}
    </div>
  );
}
