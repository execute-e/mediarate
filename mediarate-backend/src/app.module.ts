import { Module } from '@nestjs/common';
import { PrismaModule } from './config/db/PrismaService/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './shared/utils/is-dev';
import { UserModule } from './core/modules/user/user.module';
import { MyJwtModule } from './core/modules/jwt/my-jwt.module';
import { AuthModule } from './core/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    PrismaModule,
    UserModule,
    MyJwtModule,
    AuthModule,
  ],
})
export class AppModule {}
