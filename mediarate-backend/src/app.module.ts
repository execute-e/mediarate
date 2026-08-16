import { Module } from '@nestjs/common';
import { PrismaModule } from './config/db/PrismaService/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './shared/utils/is-dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
