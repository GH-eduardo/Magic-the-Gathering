import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Card, CardSchema } from "./card.schema";

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
    @Prop()
    name: string;

    @Prop()
    description: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card'})
    commander: Card;

    @Prop({ type: [CardSchema], default: [] })
    cards: Card[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
