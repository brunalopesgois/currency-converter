import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RatesService } from '@shared/external/rates.service';
import { ValidCurrencyCodeRule } from '@shared/validators/currency-code.validator';
import { ValidValueRule } from '@shared/validators/value.validator';
import { CurrencyController } from '../controllers/currency.controller';
import { CurrencyRepository } from '../repositories/currency.repository';
import { CurrencyService } from '../services/currency.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('http'),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('redis'),
      }),
    }),
  ],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    CurrencyRepository,
    RatesService,
    ValidCurrencyCodeRule,
    ValidValueRule,
  ],
})
export class CurrencyModule {}
