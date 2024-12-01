import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Status } from 'src/decks/schemas/status.schema';
import { Batch } from 'src/decks/schemas/batch.schema';

export type ImportationDocument = HydratedDocument<Importation>;

@Schema()
export class Importation {
    get id() {
        return this.id
    }

    @Prop()
    commanderName: string;

    @Prop({ type: [Batch] })
    batches: Batch[];

    @Prop({ type: [{ generatedAt: Date, status: String, observation: String }] })
    status: Status[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: User;

}

export const ImportationSchema = SchemaFactory.createForClass(Importation);