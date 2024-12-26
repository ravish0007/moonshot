import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DatabaseService } from './../database/prisma.service';

import axios from 'axios';
import trim from '@src/utils/trim';

function convertISTtoUTC(istDateStr) {
  const [day, month, year] = istDateStr.split('/').map(Number);
  const istDate = new Date(year, month - 1, day, 0, 0, 0);
  const utcTimestamp = istDate.getTime() - 5.5 * 60 * 60 * 1000;
  const utcDate = new Date(utcTimestamp);
  return utcDate.toISOString();
}

async function getUpstreamRecords(url: string) {
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  try {
    const response = await axios.get(url);

    const rows = response.data.split('\n');
    const header = rows[0].split(',');
    const labels = header.slice(3);

    const records = [];
    for (let row of rows.slice(1)) {
      row = row.trim().split(',');
      const [date, age, gender, ...timeTaken] = row;

      for (const item of zip(labels, timeTaken)) {
        records.push({
          date: convertISTtoUTC(trim(date, '"')),
          age: trim(age, '"'),
          gender: trim(gender.toUpperCase(), '"'),
          label: trim(item[0], '"'),
          time: Number(trim(item[1], '"')),
        });
      }
    }

    return { error: null, data: records };
  } catch (error) {
    return { error: error, data: null };
  }
}

@Injectable()
export class SyncService {
  constructor(private databaseService: DatabaseService) {}

  @Cron('30 2 * * *') // 6AM IST
  async syncUpstreamData() {
    const { error, data } = await getUpstreamRecords(process.env.UPSTREAM_CSV);

    if (error) {
      throw new HttpException(
        'Error while syncing',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    for (const record of data) {
      try {
        await this.databaseService.features.upsert({
          where: {
            gender_label_date_age: {
              gender: record.gender,
              label: record.label,
              date: record.date,
              age: record.age,
            },
          },
          create: record,
          update: { time: record.time },
        });
      } catch (error) {
        // unique constaint error
        if (error.code === 'P2002') {
          continue;
        }

        throw new HttpException(
          'Error while syncing',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return { status: true, message: 'sync completed' };
  }
}
