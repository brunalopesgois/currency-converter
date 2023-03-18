import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error'],
  });

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  Logger.log(`🚀 Application is running on port ${port}`);
}
bootstrap();
