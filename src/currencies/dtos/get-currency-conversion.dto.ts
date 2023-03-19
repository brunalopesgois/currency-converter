import { ValidCurrencyCodeRule } from '@shared/validators/currency-code.validator';
import { ValidValueRule } from '@shared/validators/value.validator';
import { IsNotEmpty, Validate } from 'class-validator';

export class GetCurrencyConversionDto {
  @IsNotEmpty()
  @Validate(ValidCurrencyCodeRule)
  code: string;

  @IsNotEmpty()
  @Validate(ValidValueRule)
  value: number;
}
