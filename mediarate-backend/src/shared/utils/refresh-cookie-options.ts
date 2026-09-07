import { REFRESH_TOKEN_EXPIRES_AT } from '@/core/modules/auth/const/tokens';
import { CookieOptions } from 'express';

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: process.env.NODE_ENV === 'development',
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
  maxAge: REFRESH_TOKEN_EXPIRES_AT,
};
