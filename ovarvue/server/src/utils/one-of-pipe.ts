import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class OneOfPipe implements PipeTransform {
  constructor(private readonly allowedValues: any[]) {}

  transform(value: any): any {
    if (value && !this.allowedValues.includes(value)) {
      throw new BadRequestException(
        `Invalid value: '${value}'. Allowed values are: ${this.allowedValues.join(', ')}`,
      );
    }
    return value;
  }
}
