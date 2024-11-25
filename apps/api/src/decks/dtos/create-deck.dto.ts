import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateDeckDto {

    @ApiProperty({
        description: 'name/title of the deck',
        example: 'deck da Dina',
    })
    name: string;

    @ApiProperty({
        description: 'Description of the deck',
        example: 'deck de controle',
    })
    description: string;

    @ApiProperty({
        description: 'The commander (legendary creature) of the deck (must be the english version of the card)',
        example: 'Dina, Soul Steeper'
    })
    commanderName: string;

    ownerId: mongoose.Types.ObjectId;
}
