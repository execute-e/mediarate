"use client";

import { AppLayout } from "@/src/app/providers/app-layout/app-layout";
import { ErrorBoundary } from "@/src/shared/components/error-boundary/error-boundary";
import { Footer } from "@/src/widgets/footer/ui/footer";
import { Header } from "@/src/widgets/header/ui/header";
import { AppSidebar } from "@/src/widgets/sidebar";
import React from "react";
import { Toaster } from "sonner";

export function AppPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppLayout
        header={
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
        }
        footer={<Footer />}
        sidebar={<AppSidebar />}
      >
        {children}
      </AppLayout>
      <Toaster />
    </>
  );
}
