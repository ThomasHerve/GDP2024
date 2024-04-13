import { Injectable } from '@nestjs/common';

@Injectable()
export class FunnelService {
    private readonly messageSubscribers: MessageSubscriber[] = [];

    subscribe(subscriber: MessageSubscriber)
    {
        if (this.messageSubscribers.includes(subscriber))
        {
            return;
        }

        this.messageSubscribers.push(subscriber);
    }

    unsubscribe(subscriber: MessageSubscriber)
    {
        const index = this.messageSubscribers.indexOf(subscriber);
        if (index === -1)
        {
            return;
        }

        this.messageSubscribers.splice(index, 1);
    }

    unsubscribeWhere(predicate: (subscriber: MessageSubscriber) => boolean)
    {
        const toUnsubscribe : MessageSubscriber[] = [];
        for (const subscriber of this.messageSubscribers) 
        {
            if (predicate(subscriber))
            {
                toUnsubscribe.push(subscriber);
            }
        }

        for (const subscriber of toUnsubscribe) 
        {
            this.unsubscribe(subscriber);
        }
    }

    publish(message: string): void
    {
        for (const subscriber of this.messageSubscribers) {
            subscriber.onMessage(message);
        }
    }
}
