import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const PORT = process.env.PORT ?? 3000;

  app.use(cookieParser());

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

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mediarate API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
  });

  await app.listen(PORT);
}

void bootstrap();
