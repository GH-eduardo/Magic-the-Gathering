import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
    @Prop()
    multiverseId: number;
    
    @Prop()
    cmc: number;
    
    @Prop()
    Name: string;
    
    @Prop()
    ManaCost: string;
    
    @Prop()
    Set: string;
    
    @Prop()
    Text: string;
    
    @Prop()
    Type: string;
    
    @Prop()
    Artist: string;
    
    @Prop()
    Number: string;
    
    @Prop()
    Power: string;
    
    @Prop()
    Toughness: string;
    
    @Prop()
    Layout: string;
    
    @Prop()
    ImageUrl: string;
    
    @Prop()
    ExternalId: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);