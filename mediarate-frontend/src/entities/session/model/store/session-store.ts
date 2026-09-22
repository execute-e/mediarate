import { create } from "zustand";
import { SessionStoreTypes } from "./session-store-types";
import { persist } from "zustand/middleware";
import { SessionUser } from "../types";

export const useSessionStore = create<SessionStoreTypes>()(
  persist(
    (set) => ({
      user: null,
      setSession: (user: SessionUser) => set((state) => ({ ...state, user })),
      clearSession: () => set((state) => ({ ...state, user: null })),
    }),
    { name: "mediarate-session-storage" },
  ),
);
