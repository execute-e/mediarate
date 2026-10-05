import { Injectable } from '@nestjs/common';
import { MyJwtService } from '../../jwt/my-jwt.service';
import { AuthRepository } from '../auth.repository';
import {
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN_EXPIRES_AT,
} from '../const/tokens';
import { UserAuthPayload } from '../../jwt/types/user-auth-payload';
import { hashToken } from '@/shared/utils/token';
@Injectable()
export class RefreshTokenService {
  public constructor(
    private readonly myJwtService: MyJwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  public async createPair(payload: UserAuthPayload) {
    const accessToken = await this.myJwtService.generate(
      payload,
      ACCESS_TOKEN_EXPIRES_AT,
    );
    const refreshToken = await this.myJwtService.generate(
      payload,
      REFRESH_TOKEN_EXPIRES_AT,
    );

    await this.authRepository.createRefreshToken(
      payload.userId,
      hashToken(refreshToken),
      new Date(Date.now() + REFRESH_TOKEN_EXPIRES_AT),
    );

    return { accessToken, refreshToken };
  }

  public async rotate(oldRefreshToken: string, payload: UserAuthPayload) {
    await this.revoke(oldRefreshToken);
    return this.createPair(payload);
  }

  public async revoke(refreshToken: string) {
    return this.authRepository.revokeRefreshToken(hashToken(refreshToken));
  }

  public async validate(token: string): Promise<UserAuthPayload | null> {
    const payload = await this.myJwtService.verify<UserAuthPayload>(token);
    if (!payload) return null;

    const record = await this.authRepository.findValidRefreshToken(
      hashToken(token),
    );
    if (!record) return null;

    return payload;
  }
}
