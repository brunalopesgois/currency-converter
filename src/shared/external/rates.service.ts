import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RatesService {
  private readonly logger = new Logger(RatesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async feedRates(currencies: string, base: string) {
    const cachedRates: { rates: string[]; base: string } =
      await this.cacheService.get(base);

    if (cachedRates) {
      this.logger.debug(
        `Geting data from cache: ${JSON.stringify(cachedRates)}`,
      );

      return {
        rates: cachedRates.rates,
        base: cachedRates.base,
      };
    }

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

    await this.cacheService.set(base, { rates, base }, 1800000);

    this.logger.debug(
      `Saving data in cache: ${JSON.stringify({ rates, base })}`,
    );

    return {
      rates,
      base,
    };
  }
}
