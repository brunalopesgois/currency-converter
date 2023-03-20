import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly em: EntityManager) {}

  async find(options?: Record<string, unknown>[]): Promise<Currency[] | null> {
    const currencies = await this.em.find(Currency, { ...options });

    return currencies;
  }

  async findByCode(code: string): Promise<Currency | null> {
    const currency = await this.em.findOne(Currency, { code });

    return currency;
  }

  async create(payload: CreateCurrencyDto): Promise<Currency> {
    const currency = await this.em.create(Currency, payload);

    await this.em.flush();

    return currency;
  }
}
