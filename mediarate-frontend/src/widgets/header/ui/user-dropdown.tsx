"use client";

import { SessionUser } from "@/src/entities/session";
import { UserAvatar } from "@/src/entities/user";
import { useLogout } from "@/src/features/logout";
import { Button } from "@/src/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { ROUTES } from "@/src/shared/const/routes";
import { redirect } from "next/navigation";

interface UserDropdownProps {
  user: SessionUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar userData={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => redirect(ROUTES.profile(user.username))}
              disabled={isPending}
            >
              Profile
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              onClick={() => logout()}
              disabled={isPending}
            >
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
