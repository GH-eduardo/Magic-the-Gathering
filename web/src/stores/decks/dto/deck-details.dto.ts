import { DeckCommanderInfo } from "./deck-commander.dto";

export interface DeckDetails {
    id: number,
    name: string,
    description: string,
    commander: DeckCommanderInfo,
    cards: CardOverview[],
    createdAt: string,
    editedAt: string
}
