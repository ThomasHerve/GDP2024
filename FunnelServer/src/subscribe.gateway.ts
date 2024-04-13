import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { FunnelService } from './funnel.service';
import { Socket } from 'ws';
import { Client } from './types/client';

@WebSocketGateway()
export class SubscribeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(private readonly funnelService: FunnelService) {}

    afterInit(server: any) {
        console.log("Gateway Initialized.")
    }

    handleConnection(socket: Socket, ...args: any[]) 
    {
        this.funnelService.subscribe(new Client(socket))
    }

    handleDisconnect(socket: Socket)
    {
        this.funnelService.unsubscribeWhere((subscriber) => {
            if (subscriber instanceof Client)
            {
                return subscriber.socket == socket;
            }

            return false;
        })
    }
}