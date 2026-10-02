"use client";

import { useAuthStore } from "@/src/shared/auth";
import { useLayoutEffect } from "react";

interface AccessTokenSyncProps {
  token: string | null | undefined;
}

export function AccessTokenSync({ token }: AccessTokenSyncProps) {
  useLayoutEffect(() => {
    const tokenStore = useAuthStore.getState();
    if (token) {
      tokenStore.setAccessToken(token);
    } else {
      tokenStore.clearAccessToken();
    }
  }, [token]);

  return null;
}
