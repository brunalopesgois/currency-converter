import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RatesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async feedRates(currencies: string, base: string) {
    const url = this.configService.get('API_LAYER_URL');
    const key = this.configService.get('API_LAYER_KEY');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        apikey: key,
      },
    };

    const response = await firstValueFrom(
      this.httpService.get(
        `${url}/latest?symbols=${currencies}&base=${base}`,
        requestOptions,
      ),
    );
    const rates = {
      ...response.data.rates,
    };

    return {
      rates,
      base,
    };
  }
}
