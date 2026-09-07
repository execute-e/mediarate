import { UserRole } from '@/generated/prisma/enums';
import { SetMetadata } from '@nestjs/common';

const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
