import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/shared/lib/cookie/cookie-utils";
import { Providers } from "./providers";
import { AppPageLayout } from "./app-layout";
import { AccessTokenSync } from "@/src/app/providers/access-token-sync/access-token-sync";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/shared/api/const/cookies-const";
import { getSession } from "@/src/entities/session";
import { ApiError } from "@/src/shared/api/lib/api-error";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mediarate",
  description: "Mediarate",
};

async function loadSession() {
  try {
    return { userData: await getSession(), rateLimited: false };
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return { userData: null, rateLimited: true };
    }
    
    if (!(e instanceof ApiError && e.status === 401)) {
      console.error("Failed to load session:", e);
    }
    return { userData: null, rateLimited: false };
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const { userData, rateLimited } = await loadSession();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <meta name="darkreader-lock" />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <div id="root">
          <AccessTokenSync token={accessToken} />
          <Providers>
            <AppPageLayout userData={userData} rateLimited={rateLimited}>
              {children}
            </AppPageLayout>
          </Providers>
        </div>
      </body>
    </html>
  );
}
