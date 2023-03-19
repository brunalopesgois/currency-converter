import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidValue', async: true })
@Injectable()
export class ValidValueRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    const numericValue = Number(value);

    if (numericValue <= 0 || isNaN(numericValue)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid value ${args.value}`;
  }
}
