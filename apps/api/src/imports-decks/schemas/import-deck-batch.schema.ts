import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Card } from '../../decks/schemas/card.schema';
import { ImportDeckStatus } from './import-deck-status.schema';
import { ImportDeck } from './import-deck.schema';

export type ImportDeckBatchDocument = HydratedDocument<ImportDeckBatch>;

@Schema()
export class ImportDeckBatch {
    get id() {
        return this.id
    }

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Card' })
    cards: Card[];

    @Prop({ type: [{ generatedAt: Date, status: String, obs: String }] })
    status: ImportDeckStatus[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Importation', default: null })
    importationId?: ImportDeck;

}

export const ImportDeckBatchSchema = SchemaFactory.createForClass(ImportDeckBatch);