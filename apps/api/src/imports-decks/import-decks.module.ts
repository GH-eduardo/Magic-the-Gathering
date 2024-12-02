import { Module } from '@nestjs/common';
import { ImportationMessagingService } from './services/messaging-import-deck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportDeck, ImportDeckSchema } from './schemas/import-deck.schema';
import { ImportDeckBatch } from './schemas/import-deck-batch.schema';
import { ImportDeckService } from './services/import-deck.service';
import { ImportDeckBatchService } from './services/import-deck-batch.service';
import { ImportDeckBatchController } from './controllers/import-deck-batch.controller';
import { ImportDeckController } from './controllers/import-deck.controller';
import { UsersModule } from 'src/users/users.module';
import { DecksModule } from 'src/decks/decks.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ImportDeck.name, schema: ImportDeckSchema },
            { name: ImportDeckBatch.name, schema: ImportDeckSchema }
        ]),
        UsersModule,
        DecksModule
    ],
    providers: [ImportationMessagingService, ImportDeckService, ImportDeckBatchService],
    controllers: [ImportDeckController, ImportDeckBatchController],
    exports: [ImportationMessagingService, MongooseModule]
})
export class ImportsDecksModule { }
