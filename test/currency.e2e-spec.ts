import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyModule } from '../src/currencies/modules/currency.module';
import { CurrencyRepository } from '../src/currencies/repositories/currency.repository';

describe('CurrencyController (e2e)', () => {
  let app: INestApplication;

  let repository: CurrencyRepository;

  const deleteCreatedCurrency = async () => {
    const currency = await repository.findByCode('AOA');

    await repository.delete(currency.id);
  };

  beforeAll(async () => {
    jest.setTimeout(120000);

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
            ...configService.get('testDb'),
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    repository = app.get(CurrencyRepository);

    await app.init();
  });

  afterAll(async () => {
    await deleteCreatedCurrency();
  });

  it('/currencies/conversion (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/currencies/conversion')
      .query({
        code: 'BRL',
        value: 100,
      })
      .expect('');

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
