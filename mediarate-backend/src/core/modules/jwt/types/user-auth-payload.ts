import { UserRole } from '@/generated/prisma/enums';

export interface UserAuthPayload {
  userId: string;
  role: UserRole;
}
