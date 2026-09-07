import { PrismaService } from '@/config/db/PrismaService/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async createRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ) {
    return this.prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  public async revokeRefreshToken(token: string) {
    return this.prisma.refreshToken.update({
      where: { token },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  public async findValidRefreshToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: {
        token,
        expiresAt: { gt: new Date() },
        revokedAt: null,
      },
    });
  }
}
