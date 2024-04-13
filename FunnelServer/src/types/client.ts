import { Socket } from "ws";

export class Client implements MessageSubscriber 
{
    constructor(public readonly socket: Socket) {}

    onMessage(message: string): void 
    {
        this.socket.send(message)
    }
}