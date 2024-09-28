import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { Card, CardSchema } from "./card.schema";
import { User } from "src/users/schemas/user.schema";

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
    get id() {
        return this.id
    }

    @Prop()
    name: string;

    @Prop()
    description: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card'})
    commander: Card;

    @Prop({ type: [CardSchema], default: [] })
    cards: Card[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: User;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
