import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';

@Injectable()
export class CurrencyService {
  create(createCurrencyDto: CreateCurrencyDto) {
    return 'This action adds a new currency';
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
