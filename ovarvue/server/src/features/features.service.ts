import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/prisma.service';

@Injectable()
export class FeaturesService {
  constructor(private databaseService: DatabaseService) {}

  async getAggregate(age, gender, start_date, end_date) {
    const filters: any = {};

    if (age) {
      filters.age = age;
    }

    if (gender) {
      filters.gender = gender;
    }

    if (start_date) {
      filters.date = {
        gte: start_date,
      };
    }

    if (end_date) {
      filters.date = {
        ...filters.date,
        lte: end_date,
      };
    }

    const result = await this.databaseService.features.groupBy({
      where: filters,
      by: ['label'],
      _sum: {
        time: true,
      },
    });

    return result.map((x) => ({ label: x.label, time: x._sum.time }));
  }

  async getFeatures(age, label, gender, start_date, end_date) {
    const filters: any = {};

    if (age) {
      filters.age = age;
    }

    if (label) {
      filters.label = label;
    }

    if (gender) {
      filters.gender = gender;
    }

    if (start_date) {
      filters.date = {
        gte: start_date,
      };
    }

    if (end_date) {
      filters.date = {
        ...filters.date,
        lte: end_date,
      };
    }

    const result = await this.databaseService.features.findMany({
      where: filters,
    });
    return result;
  }
}
