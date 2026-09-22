"use client";

import { useSession } from "@/src/entities/session";
import { SidebarTrigger } from "@/src/shared/components/ui/sidebar";
import { ModeToggle } from "@/src/shared/components/ui/toggle-theme";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { ROUTES } from "@/src/shared/const/routes";

export function Header() {
  const user = useSession();

  return (
    <header className="flex gap-2 items-center bg-sidebar-accent border-b-sidebar-border border-b w-full fixed h-14 sm:h-16 md:h-20">
      <SidebarTrigger />
      <ModeToggle />
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <Link href={ROUTES.auth()}>Log in</Link>
      )}
    </header>
  );
}
