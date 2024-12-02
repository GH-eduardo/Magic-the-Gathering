import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ImportationMessagingService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://magic_commander:am9jen7ac011@localhost:5672/main-vhost'],
                queue: 'magic-lotes-importacao',
            },
        });
        this.client.connect();
    }

    async sendMessage(notification: any) {
        return this.client
            .emit('lotes.importacao', notification);
    }
}