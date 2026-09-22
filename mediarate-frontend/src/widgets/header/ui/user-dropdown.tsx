"use client";

import { SessionUser } from "@/src/entities/session";
import { useLogout } from "@/src/features/logout";
import { Button } from "@/src/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";

interface UserDropdownProps {
  user: SessionUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{user.username}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
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
