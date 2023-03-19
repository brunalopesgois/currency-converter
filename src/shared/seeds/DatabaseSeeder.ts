import { Currency } from './../../currencies/entities/currency.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const dbCurrencies = await em.find(Currency, {});

    if (dbCurrencies.length === 0) {
      const defaultCurrencies: string[] = ['BRL', 'USD', 'EUR', 'INR'];

      for (const currencyCode of defaultCurrencies) {
        await em.create(Currency, { code: currencyCode });
      }
    }
  }
}
