import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'code', async: false })
export class CouponCodeValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;
    return codeRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Mã giảm giá có 6 đến 8 ký tự, chỉ bao gồm chữ cái (viết hoa hoặc viết thường) và chữ số, không được chứa ký tự đặc biệt';
  }
}
