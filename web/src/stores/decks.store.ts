import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDecksStore = defineStore('decks', () => {
    const decks = ref([
        {
            id: 2,
            name: "The best deck in the world!",
            description: "The deck made to do all-win in early game",
            commander: {
                image_url: "https://cards.scryfall.io/art_crop/front/0/3/034e0929-b2c7-4b5f-94f2-8eaf4fb1a2a1.jpg?1693611218",
                name: "Sauron, The Dark Lord"
            }
        },
        {
            id: 2,
            name: "Alternative deck",
            description: "The deck made to do all-win in early game with cheap cards",
            commander: {
                image_url: "https://cards.scryfall.io/art_crop/front/8/d/8d94b8ec-ecda-43c8-a60e-1ba33e6a54a4.jpg?1562616128",
                name: "Edgar Markov"
            }
        },
        {
            id: 3,
            name: "Old best deck",
            description: "The deck made to do survive early game",
            commander: {
                image_url: "https://cards.scryfall.io/art_crop/front/e/4/e4b1aa1e-b4e3-4346-8937-76b312501c70.jpg?1673307974",
                name: "Jodah, the Unifier"
            }
        }
    ] as DeckInfo[])
    return { decks }
})

interface DeckInfo {
    id: number
    name: string
    description: string,
    commander: DeckCommanderInfo
}

interface DeckCommanderInfo {
    image_url: string,
    name: string
}