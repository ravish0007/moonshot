import { Controller, Get, Query } from '@nestjs/common';
import { OneOfPipe } from '@src/utils/one-of-pipe';
import { ValidateISO8601Pipe } from '@src/utils/validate-iso8601';

import { FeaturesService } from './features.service';

interface PageParams {
  label: string;
  date: string;
  age: string;
  gender: string;
}

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}
  @Get()
  features(
    @Query('gender', new OneOfPipe(['MALE', 'FEMALE'])) gender: string,
    @Query('age', new OneOfPipe(['15-25', '>25'])) age: string,
    @Query('label') label: string,
    @Query('start_date', new ValidateISO8601Pipe()) start_date: string,
    @Query('end_date', new ValidateISO8601Pipe()) end_date: string,
  ) {
    return this.featuresService.getFeatures(
      age,
      label,
      gender,
      start_date,
      end_date,
    );
  }
}
