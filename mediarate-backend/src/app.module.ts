import { Module } from '@nestjs/common';
import { PrismaModule } from './config/db/PrismaService/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from './shared/utils/is-dev';
import { UserModule } from './core/modules/user/user.module';
import { MyJwtModule } from './core/modules/jwt/my-jwt.module';
import { AuthModule } from './core/modules/auth/auth.module';
import { StorageModule } from './core/modules/storage/storage.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { createThrottlerTracker } from './shared/utils/throttler-tracker';
import { DEFAULT_THROTTLE } from './shared/const/throttle.const';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    PrismaModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [DEFAULT_THROTTLE],
        errorMessage: 'Too many requests, try again later',
        getTracker: createThrottlerTracker(
          config.getOrThrow<string>('INTERNAL_PROXY_SECRET'),
        ),
      }),
    }),
    UserModule,
    MyJwtModule,
    AuthModule,
    StorageModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
