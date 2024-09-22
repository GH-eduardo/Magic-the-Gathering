import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
    @Prop()
    id: string;

    @Prop()
    oracle_id: string;

    @Prop()
    name: string;

    @Prop({ type: Date })
    released_at: Date;

    @Prop()
    uri: string;

    @Prop()
    image_normal_uri: string;

    @Prop()
    image_full_uri: string;

    @Prop()
    mana_cost: string;

    @Prop()
    cmd: number;

    @Prop()
    type_line: string;

    @Prop()
    oracle_text: string;

    @Prop()
    power: string;

    @Prop()
    toughness: string;

    @Prop()
    color_identity: [string];

    @Prop()
    is_commander: boolean;

    @Prop()
    rulings_uri: string;

    @Prop()
    rarity: string;

    @Prop()
    artist: string;

    @Prop()
    artist_ids: string;

    @Prop()
    illustration_id: string;

    @Prop()
    edhrec_url: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
