import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://magic_commander:am9jen7ac011@localhost:5672/main-vhost'],
        queue: 'magic-lotes-importacao',
      }
    }
  );
  await app.listen();
}
bootstrap();
