import { AuthPage } from "@/src/views/auth-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account or log in",
};

export default function AuthRoutePage() {
  return <AuthPage />;
}
