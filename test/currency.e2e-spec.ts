import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as sinon from 'sinon';
import { CurrencyModule } from '../src/currencies/modules/currency.module';
import { CurrencyRepository } from '../src/currencies/repositories/currency.repository';
import { RatesService } from '@shared/external/rates.service';

describe('CurrencyController (e2e)', () => {
  let app: INestApplication;

  let repository: CurrencyRepository;

  const ratesServiceStub: {
    feedRates: sinon.SinonStub;
  } = {
    feedRates: sinon.stub(),
  };

  const deleteCreatedCurrency = async () => {
    const currency = await repository.findByCode('AOA');

    await repository.delete(currency.id);
  };

  const stubRatesService = async () => {
    ratesServiceStub.feedRates = sinon
      .stub(RatesService.prototype, 'feedRates')
      .resolves({
        rates: { BRL: 1, USD: 0.190738, EUR: 0.177043, INR: 15.767437 },
        base: 'BRL',
      });
  };

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
            ...configService.get('testDb'),
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    repository = app.get(CurrencyRepository);

    await stubRatesService();

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
