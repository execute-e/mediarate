import { SessionUser } from "../types";

export interface SessionStoreTypes {
  user: null | SessionUser;
  setSession: (user: SessionUser) => void;
  clearSession: () => void;
}
