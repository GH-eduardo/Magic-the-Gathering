import { DeckCommanderInfo } from "./deck-commander.dto";

export interface DeckDetails {
    id: string,
    name: string,
    description: string,
    commander: DeckCommanderInfo,
    cards: CardOverview[],
    createdAt: string,
    editedAt: string
}
