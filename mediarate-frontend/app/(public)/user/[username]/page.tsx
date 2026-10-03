import { ProfilePage } from "@/src/views/profile-page";

export default async function ProfileRoutePage({
  params,
}: PageProps<"/user/[username]">) {
  const { username } = await params;
  return <ProfilePage username={username} />;
}
