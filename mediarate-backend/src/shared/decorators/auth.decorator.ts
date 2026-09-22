import { UserRole } from '@/generated/prisma/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
