import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthPayload } from './types/user-auth-payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyJwtService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generate<T extends Record<string, any> = UserAuthPayload>(
    payload: T,
    expiresIn: number,
  ) {
    return this.jwtService.signAsync(payload, {
      // in seconds
      expiresIn: expiresIn / 1000,
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  public async verify<T extends Record<string, any> = UserAuthPayload>(
    token: string,
  ): Promise<T | undefined> {
    try {
      return await this.jwtService.verifyAsync<T>(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });
    } catch {
      return undefined;
    }
  }
}
