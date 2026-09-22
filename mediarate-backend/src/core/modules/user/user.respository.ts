import { PrismaService } from '@/config/db/PrismaService/prisma.service';
import { Prisma } from '@/generated/prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(dto: Prisma.UserCreateInput) {
    const { username, ...rest } = dto;

    return this.prisma.user.create({
      data: {
        username: username.trim(),
        ...rest,
      },
    });
  }

  public async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  public async findAll(where?: Prisma.UserWhereInput) {
    return this.prisma.user.findMany({
      where: { ...where },
    });
  }

  public async update(id: string, payload: Prisma.UserUpdateInput) {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`User with ID: ${id} not found`);
        }
      }
      throw e;
    }
  }

  public async delete(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`User with ID: ${id} not found`);
        }
      }
      throw e;
    }
  }
}
