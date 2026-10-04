import { Prisma } from '@/generated/prisma/client';

export function isUniqueViolation(
  e: unknown,
): e is Prisma.PrismaClientKnownRequestError {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
  );
}

export function isRecordNotFound(
  e: unknown,
): e is Prisma.PrismaClientKnownRequestError {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
  );
}
