"use client";

import { ThemeProvider } from "@/src/app/providers/theme-provider/theme-provider";
import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode, useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // created inside the component (not at module scope) so every request
  // gets its own instance on the server — a module-level singleton would be
  // shared across every SSR request on the same Node.js process, letting one
  // request's cached data (e.g. an anonymous `session: null`) leak into and
  // block `initialData` for a later, different request.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            retryDelay: 2000,
          },
        },
      }),
  );

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
