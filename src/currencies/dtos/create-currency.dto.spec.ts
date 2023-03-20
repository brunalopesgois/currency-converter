import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCurrencyDto } from './create-currency.dto';

describe('CreateCurrencyDto', () => {
  it('should not fail if payload is correct', async () => {
    const payload = { code: 'AOA' };
    const createCurrencyDtoObj = plainToInstance(CreateCurrencyDto, payload);
    const errors = await validate(createCurrencyDtoObj);
    expect(errors.length).toBe(0);
  });

  it('should fail on empty code', async () => {
    const payload = { code: '' };
    const createCurrencyDtoObj = plainToInstance(CreateCurrencyDto, payload);
    const errors = await validate(createCurrencyDtoObj);
    expect(errors.length).not.toBe(0);
    expect(errors[0].constraints['isNotEmpty']).toBeTruthy();
  });

  it('should fail on invalid code', async () => {
    const payload = { code: 'foo bar' };
    const createCurrencyDtoObj = plainToInstance(CreateCurrencyDto, payload);
    const errors = await validate(createCurrencyDtoObj);
    expect(errors.length).not.toBe(0);
    expect(errors[0].constraints['ValidCurrencyCode']).toBeTruthy();
  });
});
