import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', credentials: true
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Magic Commander Decks')
    .setDescription('The magic commander decks manager')
    .setVersion('1.0')
    .addTag('decks')
    .addBearerAuth()
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json'
  });

  await app.listen(8080);
}
bootstrap();
