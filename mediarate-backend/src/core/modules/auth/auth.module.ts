import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { MyJwtModule } from '../jwt/my-jwt.module';
import { AuthRepository } from './auth.repository';
import { CookieService } from './services/cookie.service';
import { RefreshTokenService } from './services/refresh-token.service';

@Module({
  imports: [MyJwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService, CookieService, RefreshTokenService],
  exports: [AuthService],
})
export class AuthModule {}
