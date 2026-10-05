import { PrismaService } from '@/config/db/PrismaService/prisma.service';
import { Prisma } from '@/generated/prisma/client';
import {
  isRecordNotFound,
  isUniqueViolation,
} from '@/shared/utils/prisma-errors';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(dto: Prisma.UserCreateInput) {
    try {
      const { username, ...rest } = dto;

      return await this.prisma.user.create({
        data: {
          username: username.trim(),
          ...rest,
        },
      });
    } catch (e) {
      if (isUniqueViolation(e)) {
        throw new ConflictException(
          'User with this username or email already exists!',
        );
      }
      throw e;
    }
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

  public async findOneWithSelect<S extends Prisma.UserSelect>(
    where: Prisma.UserWhereUniqueInput,
    select: S,
  ) {
    return this.prisma.user.findUnique({ where, select });
  }

  public async findAll(where?: Prisma.UserWhereInput) {
    return this.prisma.user.findMany({
      where: { ...where },
    });
  }

  public async update(id: string, payload: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });
    } catch (e) {
      if (isRecordNotFound(e)) {
        throw new NotFoundException(`User with ID: ${id} not found`);
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
      if (isRecordNotFound(e)) {
        throw new NotFoundException(`User with ID: ${id} not found`);
      }
      throw e;
    }
  }
}
