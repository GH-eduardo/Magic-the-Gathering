import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, ConfirmChannel } from 'amqplib';
import { WebSocketNotificationGateway } from './websocket-notification.gateway';

const QUEUE_NAME = 'magic-notificacoes';

@Injectable()
export class RabbitMQNotificationService implements OnModuleInit {
  private channel: ConfirmChannel;

  constructor(private readonly websocketGateway: WebSocketNotificationGateway) {}

  async onModuleInit() {
    try {
      const connection = await connect('amqp://localhost');
      
      this.channel = await connection.createChannel();

      await this.channel.assertQueue(QUEUE_NAME, { durable: true });

      console.log(`Fila ${QUEUE_NAME} criada ou já existente e configurada com sucesso.`);

      this.channel.consume(QUEUE_NAME, (msg) => {
        if (msg !== null) {
          const event = JSON.parse(msg.content.toString());
          console.log(`Recebido evento de notificação: ${event.type} - ${event.message}`);
          
          this.websocketGateway.sendNotificationToUser(event.userId, event);

          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
    }
  }
}
