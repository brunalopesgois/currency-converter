import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { IConversionResponse } from '@shared/interfaces/conversion-response.interface';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { GetCurrencyConversionDto } from '../dtos/get-currency-conversion.dto';
import { Currency } from '../entities/currency.entity';
import { CurrencyService } from '../services/currency.service';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<Currency> {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get('conversion')
  async getCurrencyConversion(
    @Query() params: GetCurrencyConversionDto,
  ): Promise<IConversionResponse[]> {
    return this.currencyService.getCurrencyConversion(params);
  }
}
