import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {

    @Prop()
    name: String
    
    @Prop()
    magic_card_id: String
    
    @Prop()
    mana_cost: String
    
    @Prop()
    cmc: Number
    
    @Prop()
    field: String
    
    @Prop()
    oracle_text: String
    
    @Prop()
    power: String
    
    @Prop()
    toughness: String
    
    @Prop()
    color_identity: String[]
    
    @Prop()
    legal_in_commander: boolean | false
    
    @Prop()
    set_name: String
    
    @Prop()
    rarity: String
    
    @Prop()
    is_commander :Boolean | false
    
}

export const CardSchema = SchemaFactory.createForClass(Card);