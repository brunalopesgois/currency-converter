import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RatesService } from '@shared/external/rates.service';
import * as sinon from 'sinon';
import { CurrencyRepository } from '../repositories/currency.repository';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  const currencyMock = {
    code: 'AOA',
  };

  const currencyRepositoryStub: {
    find: sinon.SinonStub;
    findByCode: sinon.SinonStub;
    create: sinon.SinonStub;
  } = {
    find: sinon.stub().resolves([{ code: 'AOA' }, { code: 'BRL' }]),
    findByCode: sinon.stub().resolves(),
    create: sinon.stub().resolves(currencyMock),
  };

  const ratesServiceStub: {
    feedRates: sinon.SinonStub;
  } = {
    feedRates: sinon.stub().resolves({
      base: 'AOA',
      rates: {
        BRL: 0.01,
        AOA: 1,
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: CurrencyRepository,
          useFactory: () => currencyRepositoryStub,
        },
        {
          provide: RatesService,
          useFactory: () => ratesServiceStub,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new currency', async () => {
      const currency = await service.create({ code: 'AOA' });

      expect(currency.code).toBe('AOA');
      expect(currencyRepositoryStub.create.calledOnce).toBeTruthy();
    });

    it('should throw error if currency already exists', async () => {
      currencyRepositoryStub.findByCode = sinon.stub().resolves(currencyMock);

      try {
        await service.create({ code: 'AOA' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getCurrencyConversion', () => {
    it('should convert value', async () => {
      const convertedCurrencies = await service.getCurrencyConversion({
        code: 'AOA',
        value: 10,
      });

      expect(convertedCurrencies[0].code).toBe('BRL');
      expect(convertedCurrencies[0].value).toBe(0.1);
    });
  });
});
