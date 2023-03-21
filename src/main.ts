import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import tracer from 'dd-trace';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import fs from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;

  const jsonFile = fs.readFileSync(
    join(process.cwd(), 'docs/swagger.json'),
    'utf8',
  );
  const document = JSON.parse(jsonFile);
  SwaggerModule.setup('docs', app, document);

  tracer.init();

  await app.listen(port);

  Logger.log(`🚀 Application is running on port ${port}`);
}
bootstrap();
