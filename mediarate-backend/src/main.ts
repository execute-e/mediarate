import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Auto-transform payloads into DTO instances
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    // allows to provide cookies and authorization headers in requests
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
