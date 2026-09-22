"use client";

import { ThemeProvider } from "@/src/app/providers/theme-provider/theme-provider";
import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 2,
      retryDelay: 2000,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <ThemeProvider attribute={'class'} defaultTheme="light" disableTransitionOnChange>
          <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
