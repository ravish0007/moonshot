import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './sync/sync.module';
import { DatabaseModule } from './database/database.module';
import { FeaturesModule } from './features/features.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SyncModule,
    DatabaseModule,
    FeaturesModule,
    AuthModule,
  ],
})
export class AppModule {}
