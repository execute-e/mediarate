import { useShallow } from "zustand/shallow";
import { useSessionStore } from "./session-store";

export const useSession = () => useSessionStore((state) => state.user);

export const useSessionActions = () =>
  useSessionStore(
    useShallow((state) => ({
      clearSession: state.clearSession,
      setSession: state.setSession,
    })),
  );
