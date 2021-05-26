import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'year', async: false })

export class CustomDateCheck implements ValidatorConstraintInterface {
  validate(year: number, args: ValidationArguments) {
    return year >= 1900 && year <= new Date().getFullYear();
  }

  defaultMessage(args: ValidationArguments) {
    return 'invalid year';
  }
}