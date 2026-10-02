import { Prisma } from '@/generated/prisma/client';

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const IMAGE_MIME_TYPE_REGEX = /^image\/(jpeg|png|webp)$/;

export const USER_PUBLIC_PROFILE_SELECT = {
  id: true,
  username: true,
  avatarUrl: true,
  bannerUrl: true,
  createdAt: true,
  reviews: true,
} as const satisfies Prisma.UserSelect;
export const USER_PRIVATE_PROFILE_SELECT = {
  ...USER_PUBLIC_PROFILE_SELECT,
  email: true,
  refreshTokens: {
    where: { revokedAt: null },
  },
  role: true,
} as const satisfies Prisma.UserSelect;
