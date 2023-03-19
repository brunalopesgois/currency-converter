import { fx } from 'money';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { Currency } from '../entities/currency.entity';
import { CurrencyRepository } from '../repositories/currency.repository';
import { RatesService } from '@shared/external/rates.service';
import { GetCurrencyConversionDto } from '../dtos/get-currency-conversion.dto';
import { IConversionResponse } from '@shared/interfaces/conversion-response.interface';

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

  async getCurrencyConversion(
    params: GetCurrencyConversionDto,
  ): Promise<IConversionResponse[]> {
    const { code, value } = params;

    const registeredCurrencies = await this.currencyRepository.find();
    const currenciesForConversion = registeredCurrencies.map((cur) => cur.code);
    const stringCurrencies = currenciesForConversion.join(',');

    const { rates, base } = await this.ratesService.feedRates(
      stringCurrencies,
      code,
    );

    fx.base = base;
    fx.rates = rates;

    const conversionResult: IConversionResponse[] = [];
    for (const currency of currenciesForConversion) {
      if (currency != code) {
        const converted = await fx.convert(value, { from: code, to: currency });
        conversionResult.push({ code: currency, value: converted });
      }
    }

    return conversionResult;
  }
}
