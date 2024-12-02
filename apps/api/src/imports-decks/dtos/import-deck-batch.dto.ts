import { ApiProperty } from "@nestjs/swagger";
import { ImportDeckStatus } from "../schemas/import-deck-status.schema";
import { Card } from "src/decks/schemas/card.schema";

export class ImportDeckBatchDto {
    @ApiProperty({
        description: "unique identifier of the import deck",
        example: '245'
    })
    status: ImportDeckStatus[];

    @ApiProperty({
        description: "unique identifier of the import deck",
        example: '245'
    })
    cards: Card[];
}