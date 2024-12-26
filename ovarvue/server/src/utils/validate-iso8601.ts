import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

const ISO8601_FULL_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[\+\-]\d{2}:\d{2})$/;

@Injectable()
export class ValidateISO8601Pipe implements PipeTransform {
  constructor() {}

  transform(value: any): any {
    if (value && !ISO8601_FULL_REGEX.test(value))
      throw new BadRequestException(
        `Invalid value: '${value}'. It should be a full ISO8601 string`,
      );

    return value;
  }
}
