import { SessionUser } from "@/src/shared/api/types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/components/ui/avatar";
import { AvatarProps } from "radix-ui/avatar";

interface UserAvatarProps extends AvatarProps {
  userData: SessionUser;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export function UserAvatar({
  userData,
  size = "default",
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar className={className} size={size} {...props}>
      <AvatarImage
        src={userData.avatarUrl}
        alt={`${userData.username} avatar`}
      />
      <AvatarFallback className="w-full h-full">
        {userData.username.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
