import { fx } from 'money';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { GetCurrencyConvertionDto } from '../dtos/get-currency-convertion.dto';
import { Currency } from '../entities/currency.entity';
import { CurrencyRepository } from '../repositories/currency.repository';
import { RatesService } from '@shared/external/rates.service';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly ratesService: RatesService,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const { code } = createCurrencyDto;

    this.logger.debug(`Creating a new currency: ${code}`);

    const dbCurrency = await this.currencyRepository.findByCode(code);

    if (dbCurrency) {
      throw new HttpException(
        `Currency ${code} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const currency = await this.currencyRepository.create(createCurrencyDto);

    return currency;
  }

  async getCurrencyConvertion(params: GetCurrencyConvertionDto) {
    const { code, value } = params;

    const registeredCurrencies = await this.currencyRepository.find();
    const currenciesForConvertion = registeredCurrencies.map((cur) => cur.code);
    const stringCurrencies = currenciesForConvertion.join(',');

    const { rates, base } = await this.ratesService.feedRates(
      stringCurrencies,
      code,
    );

    fx.base = base;
    fx.rates = rates;

    const convertionResult: any[] = [];
    for (const currency of currenciesForConvertion) {
      if (currency != code) {
        const converted = await fx.convert(value, { from: code, to: currency });
        convertionResult.push({ code: currency, value: converted });
      }
    }

    return convertionResult;
  }
}
