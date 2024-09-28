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
        description: 'the id of the commander card',
        example: '66f0894d2ee9f2402c5cfe22',
    })
    commanderId: string;

    @ApiProperty({
        description: 'an array of card ids',
        example:
            [
                "66f4297e6a60bacc2c64c007",
                "66f4297e6a60bacc2c64c009",
                "66f4297e6a60bacc2c64c00b",
                "66f4297e6a60bacc2c64c00d",
                "66f4297e6a60bacc2c64c00f",
                "66f4297e6a60bacc2c64c011",
                "66f4297e6a60bacc2c64c013",
                "66f4297e6a60bacc2c64c015",
                "66f4297e6a60bacc2c64c017",
                "66f4297e6a60bacc2c64c019",
                "66f4297e6a60bacc2c64c01b",
                "66f4297e6a60bacc2c64c01d",
                "66f4297f6a60bacc2c64c01f",
                "66f4297f6a60bacc2c64c021",
                "66f4297f6a60bacc2c64c023",
                "66f4297f6a60bacc2c64c025",
                "66f4297f6a60bacc2c64c027",
                "66f4297f6a60bacc2c64c029",
                "66f4297f6a60bacc2c64c02b",
                "66f4297f6a60bacc2c64c02d",
                "66f4297f6a60bacc2c64c02f",
                "66f4297f6a60bacc2c64c031",
                "66f4297f6a60bacc2c64c033",
                "66f4297f6a60bacc2c64c035",
                "66f4297f6a60bacc2c64c037",
                "66f4297f6a60bacc2c64c039",
                "66f4297f6a60bacc2c64c03b",
                "66f4297f6a60bacc2c64c03d",
                "66f4297f6a60bacc2c64c03f",
                "66f4297f6a60bacc2c64c041",
                "66f4297f6a60bacc2c64c043",
                "66f4297f6a60bacc2c64c045",
                "66f4297f6a60bacc2c64c047",
                "66f4297f6a60bacc2c64c049",
                "66f4297f6a60bacc2c64c04b",
                "66f4297f6a60bacc2c64c04d",
                "66f4297f6a60bacc2c64c04f",
                "66f4297f6a60bacc2c64c051",
                "66f4297f6a60bacc2c64c053",
                "66f4297f6a60bacc2c64c055",
                "66f4297f6a60bacc2c64c057",
                "66f4297f6a60bacc2c64c059",
                "66f4297f6a60bacc2c64c05b",
                "66f4297f6a60bacc2c64c05d",
                "66f4297f6a60bacc2c64c05f",
                "66f4297f6a60bacc2c64c061",
                "66f4297f6a60bacc2c64c063",
                "66f4297f6a60bacc2c64c065",
                "66f4297f6a60bacc2c64c067",
                "66f4297f6a60bacc2c64c069",
                "66f4297f6a60bacc2c64c06b",
                "66f4297f6a60bacc2c64c06d",
                "66f4297f6a60bacc2c64c06f",
                "66f4297f6a60bacc2c64c071",
                "66f4297f6a60bacc2c64c073",
                "66f4297f6a60bacc2c64c075",
                "66f4297f6a60bacc2c64c077",
                "66f4297f6a60bacc2c64c079",
                "66f4297f6a60bacc2c64c07b",
                "66f4297f6a60bacc2c64c07d",
                "66f4297f6a60bacc2c64c07f",
                "66f4297f6a60bacc2c64c081",
                "66f4297f6a60bacc2c64c083",
                "66f4297f6a60bacc2c64c085",
                "66f4297f6a60bacc2c64c087",
                "66f4297f6a60bacc2c64c089",
                "66f4297f6a60bacc2c64c08b",
                "66f4297f6a60bacc2c64c08d",
                "66f4297f6a60bacc2c64c08f",
                "66f4297f6a60bacc2c64c091",
                "66f4297f6a60bacc2c64c093",
                "66f4297f6a60bacc2c64c095",
                "66f4297f6a60bacc2c64c097",
                "66f4297f6a60bacc2c64c099",
                "66f4297f6a60bacc2c64c09b",
                "66f4297f6a60bacc2c64c09d",
                "66f4297f6a60bacc2c64c09f",
                "66f4297f6a60bacc2c64c0a1",
                "66f4297f6a60bacc2c64c0a3",
                "66f4297f6a60bacc2c64c0a5",
                "66f4297f6a60bacc2c64c0a7",
                "66f4297f6a60bacc2c64c0a9",
                "66f4297f6a60bacc2c64c0ab",
                "66f4297f6a60bacc2c64c0ad",
                "66f4297f6a60bacc2c64c0af",
                "66f4297f6a60bacc2c64c0b1",
                "66f4297f6a60bacc2c64c0b3",
                "66f4297f6a60bacc2c64c0b5",
                "66f4297f6a60bacc2c64c0b7",
                "66f4297f6a60bacc2c64c0b9",
                "66f4297f6a60bacc2c64c0bb",
                "66f4297f6a60bacc2c64c0bd",
                "66f4297f6a60bacc2c64c0bf",
                "66f4297f6a60bacc2c64c0c1",
                "66f4297f6a60bacc2c64c0c3",
                "66f4297f6a60bacc2c64c0c5",
                "66f4297f6a60bacc2c64c0c7",
                "66f4297f6a60bacc2c64c0c9",
                "66f4297f6a60bacc2c64c0cb"
            ]
    })
    cardsIds: string[];

    ownerId: mongoose.Types.ObjectId;
}