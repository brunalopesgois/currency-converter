import { ValidCurrencyCodeRule } from '@shared/validators/currency-code.validator';
import { IsNotEmpty, Validate } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @Validate(ValidCurrencyCodeRule)
  code: string;
}
