import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Card } from "../../cards/schemas/card.schema";

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card'})
    commander: Card;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card'})
    cards: Card[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);