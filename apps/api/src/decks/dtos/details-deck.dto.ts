import { Deck } from "../schemas/deck.schema";
import { BasicCardDto } from "./basic-card.dto";

export class DetailsDeckDto {
    id: string;
    name: string;
    description: string;
    commander: BasicCardDto;
    cards: BasicCardDto[];

    static fromEntity(deck: Deck): DetailsDeckDto {
        return {
            id: deck.id,
            name: deck.name,
            description: deck.description,
            commander: BasicCardDto.fromEntity(deck.commander),
            cards: deck.cards.map(card => BasicCardDto.fromEntity(card))
        } as DetailsDeckDto;
    }
}
