import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetCurrencyConversionDto } from './get-currency-conversion.dto';

describe('GetCurrencyConversionDto', () => {
  it('should not fail if payload is correct', async () => {
    const payload = { code: 'AOA', value: 12.99 };
    const getCurrencyConversionDtoObj = plainToInstance(
      GetCurrencyConversionDto,
      payload,
    );
    const errors = await validate(getCurrencyConversionDtoObj);
    expect(errors.length).toBe(0);
  });

  describe('code', () => {
    it('should fail on empty code', async () => {
      const payload = { value: 12.99 };
      const getCurrencyConversionDtoObj = plainToInstance(
        GetCurrencyConversionDto,
        payload,
      );
      const errors = await validate(getCurrencyConversionDtoObj);
      expect(errors.length).not.toBe(0);
      expect(errors[0].constraints['isNotEmpty']).toBeTruthy();
    });

    it('should fail on invalid code', async () => {
      const payload = { code: 'foo bar', value: 12.99 };
      const getCurrencyConversionDtoObj = plainToInstance(
        GetCurrencyConversionDto,
        payload,
      );
      const errors = await validate(getCurrencyConversionDtoObj);
      expect(errors.length).not.toBe(0);
      expect(errors[0].constraints['ValidCurrencyCode']).toBeTruthy();
    });
  });

  describe('value', () => {
    it('should fail on empty value', async () => {
      const payload = { code: 'AOA' };
      const getCurrencyConversionDtoObj = plainToInstance(
        GetCurrencyConversionDto,
        payload,
      );
      const errors = await validate(getCurrencyConversionDtoObj);
      expect(errors.length).not.toBe(0);
      expect(errors[0].constraints['isNotEmpty']).toBeTruthy();
    });

    it('should fail on invalid value', async () => {
      const payload = { code: 'AOA', value: 'AOA' };
      const getCurrencyConversionDtoObj = plainToInstance(
        GetCurrencyConversionDto,
        payload,
      );
      const errors = await validate(getCurrencyConversionDtoObj);
      expect(errors.length).not.toBe(0);
      expect(errors[0].constraints['ValidValue']).toBeTruthy();
    });

    it('should fail on negative value', async () => {
      const payload = { code: 'AOA', value: -12.99 };
      const getCurrencyConversionDtoObj = plainToInstance(
        GetCurrencyConversionDto,
        payload,
      );
      const errors = await validate(getCurrencyConversionDtoObj);
      expect(errors.length).not.toBe(0);
      expect(errors[0].constraints['ValidValue']).toBeTruthy();
    });
  });
});
