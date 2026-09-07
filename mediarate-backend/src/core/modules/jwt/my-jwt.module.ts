import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MyJwtService } from './my-jwt.service';
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15min' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MyJwtService],
  exports: [MyJwtService],
})
export class MyJwtModule {}
