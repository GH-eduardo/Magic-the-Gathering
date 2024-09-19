import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDecksStore = defineStore('decks', () => {
    const decks = ref([] as DeckInfo[])
    return { decks }
})

interface DeckInfo {
    name: string
}