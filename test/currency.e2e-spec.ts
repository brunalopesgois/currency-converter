import { Currency } from './../src/currencies/entities/currency.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyModule } from '../src/currencies/modules/currency.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

describe('CurrencyController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CurrencyModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MikroOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            dbName: configService.get('TEST_DB_NAME'),
            user: configService.get('TEST_DB_USER'),
            password: configService.get('TEST_DB_PASSWORD'),
            host: configService.get('TEST_DB_HOST'),
            port: parseInt(configService.get('TEST_DB_PORT')),
            type: 'postgresql',
            entities: [Currency],
            migrations: {
              path: process.cwd() + '/src/shared/migrations',
              snapshot: false,
            },
            seeder: {
              path: process.cwd() + '/src/shared/seeds',
              defaultSeeder: 'DatabaseSeeder',
              emit: 'ts',
              fileName: (className: string) => className,
            },
            autoLoadEntities: true,
            syncronize: true,
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/currencies/conversion (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/currencies/conversion')
      .query({
        code: 'BRL',
        value: 12,
      })
      .expect(200);
  });
});
