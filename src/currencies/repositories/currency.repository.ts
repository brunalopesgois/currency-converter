import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly em: EntityManager) {}

  async find(options?: Record<string, unknown>[]): Promise<Currency[] | null> {
    const emFork = this.em.fork();

    const currencies = await emFork.find(Currency, { ...options });

    return currencies;
  }

  async findByCode(code: string): Promise<Currency | null> {
    const emFork = this.em.fork();

    const currency = await emFork.findOne(Currency, { code });

    return currency;
  }

  async create(payload: CreateCurrencyDto): Promise<Currency> {
    const emFork = this.em.fork();

    const currency = await emFork.create(Currency, payload);

    await emFork.flush();

    return currency;
  }

  async delete(id: string): Promise<void> {
    const emFork = this.em.fork();

    await emFork.nativeDelete(Currency, { id });
  }
}
