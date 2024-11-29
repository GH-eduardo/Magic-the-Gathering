import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class ImportDeckDto {

    @ApiProperty({
        description: 'name/title of the deck',
        example: 'Deck importado',
    })
    name: string;

    @ApiProperty({
        description: 'description of the deck',
        example: 'esse deck foi importado',
    })
    description: string;

    @ApiProperty({
        description: 'the name of the commander card',
        example: '',
    })
    commanderName: string;

    @ApiProperty({
        description: 'an array of card names',
        example:
            [

            ]
    })
    cardsNames: string[];

    ownerId: mongoose.Types.ObjectId;
}