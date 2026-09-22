import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../user/dto/request/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dto/request/login.dto';
import { UserAuthPayload } from '../../jwt/types/user-auth-payload';
import { PASSWORD_CRYPT_SALT } from '../const/passwd';
import { RefreshTokenService } from './refresh-token.service';
import { User } from '@/generated/prisma/client';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  // # method that creates session and extracting password from user object (used in register() and login())
  private async createSession(user: User) {
    const tokenPayload: UserAuthPayload = {
      userId: user.id,
      role: user.role,
    };

    const { refreshToken, accessToken } =
      await this.refreshTokenService.createPair(tokenPayload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, refreshToken, accessToken };
  }

  public async register(dto: CreateUserDto) {
    const [email, username] = await Promise.all([
      this.userService.findOneByEmail(dto.email),
      this.userService.findOneByUsername(dto.username),
    ]);

    if (email) {
      throw new ConflictException('User with this email is already exists');
    }

    if (username) {
      throw new ConflictException('User with this username is already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, PASSWORD_CRYPT_SALT);

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.createSession(user);
  }

  public async login(dto: LoginDto) {
    const user = await this.userService.findOneByUsername(dto.username);

    if (!user) {
      throw new NotFoundException('User with this username does not exist');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password!');
    }

    return this.createSession(user);
  }

  public async logout(refreshToken: string) {
    return this.refreshTokenService.revoke(refreshToken);
  }

  public async refresh(refreshToken: string) {
    const payload = await this.refreshTokenService.validate(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userService.findOneById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
      await this.refreshTokenService.rotate(refreshToken, {
        userId: user.id,
        role: user.role,
      });

    return { refreshToken: newRefreshToken, accessToken: newAccessToken };
  }
}
