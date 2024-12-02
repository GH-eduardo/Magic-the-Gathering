import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { ImportDeckBatch } from './import-deck-batch.schema';

export type ImportDeckDocument = HydratedDocument<ImportDeck>;

@Schema()
export class ImportDeck {
    get id() {
        return this.id
    }

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    commanderName: string;

    @Prop({ type: [ImportDeckBatch] })
    batches: ImportDeckBatch[];

    @Prop({ type: [{ generatedAt: Date, status: String, observation: String }] })
    status: ImportDeck[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: User;

}

export const ImportDeckSchema = SchemaFactory.createForClass(ImportDeck);