import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
    id: string;
    oracle_id: string;
    name: string;
    released_at: Date;
    uri: string;
    image_uri: string;
    mana_cost: string;
    cmd: number;
    type_line: string;
    oracle_text: string;
    power: string;
    toughness: string;
    color_identity: string[];
    is_commander: boolean;
    rulings_uri: string;
    rarity: string;
    artist: string;
    artist_ids: string;
    illustration_id: string;
    edhrec_url: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);