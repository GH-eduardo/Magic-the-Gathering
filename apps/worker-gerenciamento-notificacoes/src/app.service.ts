import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfirmChannel, connect } from 'amqplib';
import { WebSocketNotificationGateway } from '../../websocket-service/src/websocket-notification.gateway';

@Injectable()
export class AppService implements OnModuleInit {
  private channel: ConfirmChannel;

  constructor(private readonly gateway: WebSocketNotificationGateway) {}

  async onModuleInit() {
    try {
      const connection = await connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue('notification-queue', { durable: true });

      this.channel.consume('notification-queue', (msg) => {
        if (msg !== null) {
          const event: NotificationEvent = JSON.parse(msg.content.toString());
          this.handleNotificationEvent(event);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
    }
  }

  private handleNotificationEvent(event: NotificationEvent) {
    console.log(`Recebido evento de notificação: ${event.type} - ${event.message}`);
    this.gateway.sendNotificationToUser(event.userId, event); 
  }
}
