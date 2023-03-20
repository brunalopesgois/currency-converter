import { Injectable } from '@nestjs/common';
import { ECurrencyCode } from '@shared/enums/currency-code.enum';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidCurrencyCode', async: true })
@Injectable()
export class ValidCurrencyCodeRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (!value) {
      return false;
    }

    if (!Object.keys(ECurrencyCode).includes(value.toUpperCase())) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const codesArray: string[] = [];
    for (const key in ECurrencyCode) {
      codesArray.push(key);
    }
    return `Invalid currency code ${args.value}. Valid options: ${codesArray}`;
  }
}
