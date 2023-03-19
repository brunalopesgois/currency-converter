import { Module } from '@nestjs/common';
import { CurrencyController } from '../controllers/currency.controller';
import { CurrencyRepository } from '../repositories/currency.repository';
import { CurrencyService } from '../services/currency.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository],
})
export class CurrencyModule {}
