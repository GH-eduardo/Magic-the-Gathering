import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './schemas/deck.schema';
import { Card, CardSchema } from './schemas/card.schema';
import { DecksController } from './decks.controller';
import { DecksService } from './deck.service';
import { UsersModule } from 'src/users/users.module';
import { Importation, ImportationSchema } from './schemas/importation.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Deck.name, schema: DeckSchema },
            { name: Card.name, schema: CardSchema },
            { name: Importation.name, schema: ImportationSchema }
        ]),
        UsersModule
    ],
    controllers: [DecksController],
    providers: [DecksService]
})
export class DecksModule { }
