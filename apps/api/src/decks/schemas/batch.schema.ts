import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from './status.schema';
import { Card } from './card.schema';
import { Importation } from './importation.schema';

export type BatchDocument = HydratedDocument<Batch>;

@Schema()
export class Batch {
    get id() {
        return this.id
    }

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Card' })
    cards: Card[];

    @Prop({ type: [{ generatedAt: Date, status: String, obs: String }] })
    status: Status[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Importation', default: null })
    importationId?: Importation;

}

export const BatchSchema = SchemaFactory.createForClass(Batch);