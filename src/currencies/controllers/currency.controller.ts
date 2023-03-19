import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { GetCurrencyConvertionDto } from '../dtos/get-currency-convertion.dto';
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

  @Get('convertion')
  async getCurrencyConvertion(@Query() params: GetCurrencyConvertionDto) {
    return this.currencyService.getCurrencyConvertion(params);
  }
}
