import { Card } from "../schemas/card.schema";

export class BasicCardDto {
    id: string;
    name: string;
    imageUri: string;

    static fromEntity(card: Card): BasicCardDto {
        return {
            id: card.id,
            name: card.name,
            imageUri: card.image_normal_uri || '',
        } as BasicCardDto;
    }
}
