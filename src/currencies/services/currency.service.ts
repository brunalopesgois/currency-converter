import { fx } from 'money';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { GetCurrencyConvertionDto } from '../dtos/get-currency-convertion.dto';
import { Currency } from '../entities/currency.entity';
import { CurrencyRepository } from '../repositories/currency.repository';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly httpService: HttpService,
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

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        apikey: 'VxCAPMLp1GjJKJDPPIRv84VziwsUzMYa',
      },
    };

    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${stringCurrencies}&base=${code}`,
        requestOptions,
      ),
    );
    const rates = {
      ...response.data.rates,
    };

    fx.base = code;
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
