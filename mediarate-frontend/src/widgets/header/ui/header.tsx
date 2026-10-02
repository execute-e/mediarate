"use client";

import { SidebarTrigger } from "@/src/shared/components/ui/sidebar";
import { ModeToggle } from "@/src/shared/components/ui/toggle-theme";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { ROUTES } from "@/src/shared/const/routes";
import { SessionUser, useSession } from "@/src/entities/session";

interface HeaderProps {
  user: SessionUser | null | undefined;
}

export function Header({ user }: HeaderProps) {
  const data = useSession(user);

  return (
    <header className="bg-sidebar-accent border-b-sidebar-border border-b w-full fixed z-5 h-10 sm:h-12 md:h-14">
      <div className="px-5 flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Link href={ROUTES.home()}>Home</Link>
        </div>
        <div className="flex items-center gap-2 h-full">
          <ModeToggle />
          {data ? (
            <UserDropdown user={data} />
          ) : (
            <Link href={ROUTES.auth()}>Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
