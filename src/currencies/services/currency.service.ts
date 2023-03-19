import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { Currency } from '../entities/currency.entity';
import { CurrencyRepository } from '../repositories/currency.repository';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

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
}
