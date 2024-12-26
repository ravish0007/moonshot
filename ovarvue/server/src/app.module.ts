import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './sync/sync.module';
import { DatabaseModule } from './database/database.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SyncModule,
    DatabaseModule,
    FeaturesModule,
  ],
})
export class AppModule {}
