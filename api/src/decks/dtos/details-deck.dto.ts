import { BasicCardDto } from "./basicCardDto.dto";

export interface DetailsDeckDto {
    name: string;
    description: string;
    commander: BasicCardDto;
    cards: BasicCardDto[];
}
