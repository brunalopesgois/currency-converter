import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CurrencyController } from '../controllers/currency.controller';
import { Currency } from '../entities/currency.entity';
import { CurrencyService } from '../services/currency.service';

@Module({
  imports: [MikroOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
