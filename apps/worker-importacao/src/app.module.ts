import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import { Batch, BatchSchema } from './schemas/batch.schema';
import { Importation, ImportationSchema } from './schemas/importation.schema';
import { Card, CardSchema } from './schemas/card.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './schemas/deck.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true, envFilePath: '.env.development' }
    ),
    MongooseModule.forRoot(
      `mongodb://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/`
    ),
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Deck.name, schema: DeckSchema },
        { name: Card.name, schema: CardSchema },
        { name: Importation.name, schema: ImportationSchema },
        { name: Batch.name, schema: BatchSchema }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
