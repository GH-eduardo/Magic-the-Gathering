import { Deck } from "../schemas/deck.schema";
import { BasicCardDto } from "./basic-card.dto";

export class DetailsDeckDto {
    name: string;
    description: string;
    commander: BasicCardDto;
    cards: BasicCardDto[];

    static fromEntity(deck: Deck): DetailsDeckDto {
        return {
            name: deck.name,
            description: deck.description,
            commander: BasicCardDto.fromEntity(deck.commander),
            cards: deck.cards.map(card => BasicCardDto.fromEntity(card))
        } as DetailsDeckDto;
    }
}
