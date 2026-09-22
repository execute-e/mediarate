import 'express';
import { UserAuthPayload } from '@/core/modules/jwt/types/user-auth-payload';

declare module 'express' {
  interface Request {
    cookies: Record<string, string | undefined>;
    user: UserAuthPayload;
  }
}
