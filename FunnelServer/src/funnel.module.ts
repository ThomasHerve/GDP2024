import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';
import { FunnelService } from './funnel.service';
import { SubscribeGateway } from './subscribe.gateway';

@Module({
  imports: [],
  controllers: [PublishController],
  providers: [FunnelService, SubscribeGateway],
})
export class FunnelModule {}
