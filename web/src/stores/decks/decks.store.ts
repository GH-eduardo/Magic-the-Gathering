import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DeckDetails } from './dto/deck-details.dto'
import { DeckOverview } from './dto/deck-overview.dto'
import { useUsersStore } from '../users/user.store'

export const useDecksStore = defineStore('decks', () => {
    const userStore = useUsersStore();
    const decks = ref([
        {
            deckId: "1",
            name: "The best deck in the world!",
            description: "The deck made to do all-win in early game",
            commanderImage: "https://cards.scryfall.io/art_crop/front/0/3/034e0929-b2c7-4b5f-94f2-8eaf4fb1a2a1.jpg?1693611218"
        },
        {
            deckId: "2",
            name: "Alternative deck",
            description: "The deck made to do all-win in early game with cheap cards",
            commanderImage: "https://cards.scryfall.io/art_crop/front/8/d/8d94b8ec-ecda-43c8-a60e-1ba33e6a54a4.jpg?1562616128"
        },
        {
            deckId: "3",
            name: "Old best deck",
            description: "The deck made to do survive early game",
            commanderImage: "https://cards.scryfall.io/art_crop/front/e/4/e4b1aa1e-b4e3-4346-8937-76b312501c70.jpg?1673307974"
        }
    ] as DeckOverview[])

    const deckDetails = ref({
        id: "1",
        name: 'The best deck in the world!',
        description: 'The deck made to do all-win in early game',
        commander: {
            image_url: "https://cards.scryfall.io/border_crop/front/0/3/034e0929-b2c7-4b5f-94f2-8eaf4fb1a2a1.jpg?1693611218",
            name: "Sauron, The Dark Lord"
        },
        cards: [
            {
                id: "1",
                name: 'Llanowar Elves',
                image_url: 'https://cards.scryfall.io/normal/front/8/b/8bbcfb77-daa1-4ce5-b5f9-48d0a8edbba9.jpg?1592765148'
            },
            {
                id: "2",
                name: "Nature's Lore",
                image_url: 'https://cards.scryfall.io/normal/front/f/5/f5615c05-eb1e-4d27-a323-72d643d7c1d8.jpg?1706547171'
            },
            {
                id: "3",
                name: "Assassin's Trophy",
                image_url: 'https://cards.scryfall.io/normal/front/e/d/ed6c7d29-71b4-4134-b591-5598f479d592.jpg?1706242115'
            },
            {
                id: "4",
                name: 'Faeburrow Elder',
                image_url: 'https://cards.scryfall.io/normal/front/c/8/c817cf1f-c0fe-49ab-a8e9-1d09b4c15e57.jpg?1673305511'
            }
        ],
        createdAt: new Date().toLocaleString(),
        editedAt: new Date().toLocaleDateString()
    } as DeckDetails)

    async function getDecksOverview(): Promise<DeckOverview[]> {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks`, {
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    async function getDeckDetails(id: string): Promise<DeckDetails | null> {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}`, {
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    async function deleteDeck(id: string): Promise<void> {
        await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
    }
    return { getDeckDetails, getDecksOverview, deleteDeck }
})
