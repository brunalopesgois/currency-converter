import { Currency } from './../src/currencies/entities/currency.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyModule } from '../src/currencies/modules/currency.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';

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

  afterAll(async () => {
    const orm = await MikroORM.init({
      dbName: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      host: process.env.TEST_DB_HOST,
      port: parseInt(process.env.TEST_DB_PORT),
      type: 'postgresql',
      entities: [Currency],
    });

    await orm.em.nativeDelete(Currency, { code: 'AOA' });
  });

  it('/currencies/conversion (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/currencies/conversion')
      .query({
        code: 'BRL',
        value: 100,
      })
      .expect(200);

    expect(response.body[0].code).toBe('USD');
    expect(response.body[0].value).toBeDefined();
  });

  it('/currencies (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/currencies')
      .send({ code: 'AOA' })
      .expect(201);

    expect(response.body.code).toBe('AOA');
  });
});
