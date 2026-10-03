"use client";

import { AppLayout } from "@/src/app/providers/app-layout/app-layout";
import { SessionUser } from "@/src/entities/session";
import { ErrorBoundary } from "@/src/shared/components/error-boundary/error-boundary";
import { Footer } from "@/src/widgets/footer/ui/footer";
import { Header } from "@/src/widgets/header/ui/header";
import { AppSidebar } from "@/src/widgets/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

export function AppPageLayout({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData?: SessionUser | null;
}) {
  const pathname = usePathname();

  return (
    <>
      <AppLayout
        header={
          <ErrorBoundary>
            <Header user={userData} />
          </ErrorBoundary>
        }
        footer={<Footer />}
        sidebar={<AppSidebar />}
      >
        <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>
      </AppLayout>
      <Toaster />
    </>
  );
}
