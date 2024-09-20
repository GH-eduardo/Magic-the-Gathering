import { DeckCommanderInfo } from "./deck-commander.dto"

export interface DeckOverview {
    id: number
    name: string
    description: string,
    commander: DeckCommanderInfo
}