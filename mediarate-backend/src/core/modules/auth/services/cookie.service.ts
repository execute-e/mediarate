import { REFRESH_TOKEN_COOKIE_OPTIONS } from '@/shared/utils/refresh-cookie-options';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../const/cookies';

@Injectable()
export class CookieService {
  public setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
    });
  }

  public clearRefreshCookie(res: Response) {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS);
  }
}
