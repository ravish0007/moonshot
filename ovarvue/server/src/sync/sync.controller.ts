import { Controller, Post, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @UseGuards(AuthGuard)
  @Post()
  syncData() {
    return this.syncService.syncUpstreamData();
  }
}
