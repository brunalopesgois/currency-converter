import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { RatesService } from '@shared/external/rates.service';
import { CurrencyService } from '../services/currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from '../repositories/currency.repository';
import { HttpException } from '@nestjs/common';

describe('CurrencyController', () => {
  let controller: CurrencyController;

  const currencyMock = {
    code: 'AOA',
  };

  const currencyRepositoryStub: {
    find: sinon.SinonStub;
    findByCode: sinon.SinonStub;
    create: sinon.SinonStub;
  } = {
    find: sinon.stub().resolves([]),
    findByCode: sinon.stub().resolves(),
    create: sinon.stub().resolves(currencyMock),
  };

  const ratesServiceStub: {
    feedRates: sinon.SinonStub;
  } = {
    feedRates: sinon.stub().resolves({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
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

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new currency', async () => {
      const currency = await controller.create({ code: 'AOA' });

      expect(currency.code).toBe('AOA');
    });

    it('should throw error if currency already exists', async () => {
      currencyRepositoryStub.findByCode = sinon.stub().resolves(currencyMock);

      try {
        await controller.create({ code: 'AOA' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getCurrencyConversion', () => {
    it('should convert value', async () => {
      await controller.getCurrencyConversion({
        code: 'AOA',
        value: 12.99,
      });

      expect(currencyRepositoryStub.find.calledOnce).toBeTruthy();
      expect(ratesServiceStub.feedRates.calledOnce).toBeTruthy();
    });
  });
});
