import { Controller, Post, Body } from '@nestjs/common';
import { FunnelService } from './funnel.service';

@Controller("publish")
export class PublishController {
    constructor(private readonly funnelService: FunnelService) {}

    @Post()
    publish(@Body("message") message: string)
    {
        this.funnelService.publish(message);
    }
}